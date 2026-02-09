"use server";
 
import prisma from "@/lib/prisma";
 
export type ExploreFilters = {
  platform?: "PC" | "PS5" | "XBOX" | "SWITCH" | "MOBILE" | "AUTRE";
  status?: "A_JOUER" | "EN_COURS" | "TERMINE" | "ABANDONNE";
};
 
export async function getPublicGames(filters: ExploreFilters) {
  return prisma.game.findMany({
    where: {
      isPublic: true,
      ...(filters.platform ? { platform: filters.platform } : {}),
      ...(filters.status ? { status: filters.status } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}