import { getPublicGames } from "@/actions/games";
 
const PLATFORMS = ["PC", "PS5", "XBOX", "SWITCH", "MOBILE", "AUTRE"] as const;
const STATUSES = ["A_JOUER", "EN_COURS", "TERMINE", "ABANDONNE"] as const;
 
function labelStatus(s: string) {
  if (s === "A_JOUER") return "À jouer";
  if (s === "EN_COURS") return "En cours";
  if (s === "TERMINE") return "Terminé";
  return "Abandonné";
}
 
export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string; status?: string }>;
}) {
  const params = await searchParams;

  const platform = PLATFORMS.includes(params.platform as any)
    ? (params.platform as (typeof PLATFORMS)[number])
    : undefined;

  const status = STATUSES.includes(params.status as any)
    ? (params.status as (typeof STATUSES)[number])
    : undefined;
 
  
 
  const games = await getPublicGames({ platform, status });
 
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Explore</h1>
        
      </div>
 
      {/* Filtres */}
      <form method="GET" className="mt-6 grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-3">
  <div className="space-y-1">
    <label className="text-sm font-medium">Plateforme</label>
    <select name="platform" defaultValue={platform ?? ""} className="w-full rounded-md border px-3 py-2">
      <option value="">Toutes</option>
      {PLATFORMS.map((p) => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
  </div>
 
  <div className="space-y-1">
    <label className="text-sm font-medium">Statut</label>
    <select name="status" defaultValue={status ?? ""} className="w-full rounded-md border px-3 py-2">
      <option value="">Tous</option>
      {STATUSES.map((s) => (
        <option key={s} value={s}>{labelStatus(s)}</option>
      ))}
    </select>
  </div>
 
  <button className="mt-6 rounded-md bg-black px-4 py-2 text-white hover:opacity-90">
    Filtrer
  </button>
 
  <div className="sm:col-span-3">
    <a href="/explore" className="text-sm underline text-gray-700 hover:text-black">
      Réinitialiser les filtres
    </a>
  </div>
</form>
 
      {/* Liste */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {games.length === 0 ? (
          <div className="rounded-lg border p-6 text-sm text-gray-600 sm:col-span-2">
            Aucun jeu public trouvé avec ces filtres.
          </div>
        ) : (
          games.map((g) => (
            <div key={g.id} className="rounded-lg border p-4">
              <div className="font-medium">{g.title}</div>
              <div className="mt-1 text-sm text-gray-600">
                {g.platform} · {labelStatus(g.status)}
                {g.rating ? ` · ${g.rating}/5` : ""}
              </div>
 
              {g.imageUrl ? (
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="mt-3 h-40 w-full rounded-md object-cover"
                />
              ) : null}
            </div>
          ))
        )}
      </div>
    </main>
  );
}