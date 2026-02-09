import { getUserGames, updateGame, deleteGame } from "@/actions/games";
import Link from "next/link";
import { GameStatus } from "@/generated/prisma/enums";

const STATUSES = [
  { value: "A_JOUER", label: "À jouer" },
  { value: "EN_COURS", label: "En cours" },
  { value: "TERMINE", label: "Terminé" },
  { value: "ABANDONNE", label: "Abandonné" },
] as const;

function Stars({ value }: { value?: number | null }) {
  const v = Math.max(0, Math.min(5, value ?? 0));
  return (
    <span className="text-sm" aria-label={`Note ${v}/5`}>
      {"★".repeat(v)}
      <span className="text-gray-400">{"★".repeat(5 - v)}</span>
    </span>
  );
}

export default async function DashboardPage() {
  const games = await getUserGames();

  // --- Statistiques obligatoires ---
  const totalGames = games.length;

  const statusCount = games.reduce((acc, g) => {
    acc[g.status] = (acc[g.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ratedGames = games.filter((g) => g.rating != null);
  const avgRating =
    ratedGames.length > 0
      ? (ratedGames.reduce((sum, g) => sum + (g.rating ?? 0), 0) / ratedGames.length).toFixed(1)
      : "N/A";

  const platformCount = games.reduce((acc, g) => {
    acc[g.platform] = (acc[g.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topPlatform =
    Object.entries(platformCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link
          href="/dashboard/add"
          className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
        >
          + Ajouter un jeu
        </Link>
      </div>

      {/* Statistiques */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 text-center
">
          <div className="text-2xl font-bold">{totalGames}</div>
          <div className="text-sm text-gray-500">Total jeux</div>
        </div>
        <div className="rounded-lg border bg-white p-4 text-center
">
          <div className="text-2xl font-bold">{avgRating}</div>
          <div className="text-sm text-gray-500">Note moyenne</div>
        </div>
        <div className="rounded-lg border bg-white p-4 text-center
">
          <div className="text-2xl font-bold">{topPlatform}</div>
          <div className="text-sm text-gray-500">Plateforme top</div>
        </div>
        <div className="rounded-lg border bg-white p-4 text-center
">
          <div className="text-2xl font-bold">{statusCount["TERMINE"] ?? 0}</div>
          <div className="text-sm text-gray-500">Terminés</div>
        </div>
      </div>

      {/* Repartition par statut */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STATUSES.map((s) => (
          <div key={s.value} className="rounded-md bg-gray-100 px-3 py-2 text-center text-sm">
            <span className="font-medium">{statusCount[s.value] ?? 0}</span> {s.label}
          </div>
        ))}
      </div>

      {/* Liste des jeux */}
      <div className="mt-6 space-y-3">
        {games.length === 0 ? (
          <div className="rounded-lg border p-6 text-sm text-gray-600">
            Aucun jeu pour l&apos;instant.
          </div>
        ) : (
          games.map((g) => (
            <div key={g.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-medium">{g.title}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {g.platform} · {STATUSES.find((s) => s.value === g.status)?.label}
                  </div>
                  <div className="mt-2">
                    <Stars value={g.rating} />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <form
                    action={async (fd) => {
                      "use server";
                      const status = String(fd.get("status")) as GameStatus;
                      await updateGame(g.id, { status });
                    }}
                  >
                    <select
                      name="status"
                      defaultValue={g.status}
                      className="rounded-md border px-3 py-2 text-sm"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button className="ml-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                      Sauver
                    </button>
                  </form>

                  <form
                    action={async () => {
                      "use server";
                      await deleteGame(g.id);
                    }}
                  >
                    <button className="rounded-md border px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
