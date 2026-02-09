import Link from "next/link";
import { SignedIn,SignedOut } from "@clerk/nextjs";

export default function Home() {
  return(
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Game<span className="text-indigo-600">Vault</span>
      </h1>
      <p className="mt-4 max-w-md text-lg text-gray-600">
        Gerez votre collection de jeux video et decouvrez celles des autres joueurs.
      </p>

      <div className="mt-8 flex gap-4">
        <SignedIn>
          <Link
            href="/dashboard"
            className="rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
          >
            Ma Collection
          </Link>
        </SignedIn>

        <SignedOut>
          <Link
            href="/sign-up"
            className="rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
          >
            Commencer
          </Link>
        </SignedOut>

        <Link
          href="/explore"
          className="rounded-md border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
        >
          Explorer
        </Link>
      </div>
    </main>

  )
}