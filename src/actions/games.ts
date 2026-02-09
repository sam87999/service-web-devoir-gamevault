'use server'

import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath} from "next/cache";
import { Platform,GameStatus } from "@/generated/prisma/enums";


// ajouter un jeu 

export async function addGame(data:{
    title:string,
    platform:Platform,
    status?:GameStatus ,
    rating?:number,
    imageUrl?:string
    isPublic:boolean
}) {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    await prisma.game.create({
        data:{
            ...data,
            userId
        }
    })
    revalidatePath("/dashboard")
}



// recuperer les jeux d'un utilisateur

export async function getUserGames(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    return await prisma.game.findMany({
        where:{
            userId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
}

// modifier un jeu avec verification de l'utilisateur

export async function updateGame(
    gameId:number,
    data:{
        title?:string,
        platform?:Platform,
        status?:GameStatus,
        rating?:number,
        imageUrl?:string
        isPublic?:boolean
    }
) {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const game = await prisma.game.findUnique({
        where:{
            id:gameId
        }
    })
    if(!game || game.userId !== userId) throw new Error("Unauthorized");

    await prisma.game.update({
        where:{
            id:gameId
        },
        data
    })
    revalidatePath("/dashboard")
}

// supprimer un jeu avec verification de l'utilisateur
export async function deleteGame(gameId:number) {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const game = await prisma.game.findUnique({
        where:{
            id:gameId
        }
    })
    if(!game || game.userId !== userId) throw new Error("Unauthorized");

    await prisma.game.delete({
        where:{
            id:gameId
        }    })
    revalidatePath("/dashboard")
}

// recuperer les jeux publics (avec filtres optionnels)

export async function getPublicGames(filters?: {
    platform?: string
    status?: string
}){
    return await prisma.game.findMany({
        where:{
            isPublic:true,
            ...(filters?.platform ? { platform: filters.platform as Platform } : {}),
            ...(filters?.status ? { status: filters.status as GameStatus } : {}),
        },
        orderBy:{
            createdAt:"desc"
        }
    })
}


// rechercher des jeux via RAWG API

export async function searchGamesRAWG(query:string){
    if (!query || query.length < 2) return [];

    const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=5`);
    
    const data = await res.json();

    return (data.results ?? []).map((g:any) => ({
        title:g.name,
        platform:g.platforms?.map((p:any) => p.platform.name)??[],
        imageUrl:g.background_image ?? "",
    }))
}