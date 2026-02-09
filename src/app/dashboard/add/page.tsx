'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addGame, searchGamesRAWG } from '@/actions/games'
import { Platform, GameStatus } from '@/generated/prisma/enums'

const PLATFORMS = [
  { value: 'PC', label: 'PC' },
  { value: 'PS5', label: 'PS5' },
  { value: 'XBOX', label: 'Xbox' },
  { value: 'SWITCH', label: 'Switch' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'AUTRE', label: 'Autre' },
]

const STATUSES = [
  { value: 'A_JOUER', label: 'À jouer' },
  { value: 'EN_COURS', label: 'En cours' },
  { value: 'TERMINE', label: 'Terminé' },
  { value: 'ABANDONNE', label: 'Abandonné' },
]

type RAWGResult = { title: string; imageUrl: string; platforms: string[] }

export default function AddGamePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<RAWGResult[]>([])  // la liste des suggestions de jeux provenant de RAWG
  const [imageUrl, setImageUrl] = useState('')
  
  // Fonction pour gérer la recherche de jeux sur RAWG
  // mets a jour query ave ce que le user tape
  // si la query a moins de 2 caracteres, on vide les suggestions
  // sinon on fetch les suggestions de RAWG et on les stocke dans suggestions
  async function handleSearch(value: string) {
    setQuery(value)
    if (value.length < 2) { setSuggestions([]); return }
    const results = await searchGamesRAWG(value)
    setSuggestions(results)
  }
  // apeller quand le user clique sur une suggestion dans le dropdown 
  // met a jour le titre et l'image du jeu avec les infos de la suggestion, et vide les suggestions
  function pickSuggestion(s: RAWGResult) {
    setQuery(s.title)
    setImageUrl(s.imageUrl)
    setSuggestions([])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const title = fd.get('title') as string
    const platform = fd.get('platform') as Platform
    const status = fd.get('status') as GameStatus
    const rating = fd.get('rating') ? Number(fd.get('rating')) : undefined
    const isPublic = fd.get('isPublic') === 'on'

    await addGame({ title, platform, status, rating, isPublic, imageUrl: imageUrl || undefined })
    router.push('/dashboard')
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Ajouter un jeu</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Titre *</label>
          <input
            name="title"
            required
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Rechercher un jeu (RAWG)..."
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => pickSuggestion(s)}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-100"
                >
                  {s.imageUrl && (
                    <img src={s.imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
                  )}
                  <span className="text-sm">{s.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {imageUrl && (
          <div>
            <label className="block text-sm font-medium mb-1">Image RAWG</label>
            <img src={imageUrl} alt="preview" className="h-32 w-full rounded-md object-cover" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Plateforme *</label>
          <select name="platform" required className="w-full rounded-md border px-3 py-2">
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Statut</label>
          <select name="status" className="w-full rounded-md border px-3 py-2">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note (1-5)</label>
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input name="isPublic" type="checkbox" defaultChecked id="isPublic" />
          <label htmlFor="isPublic" className="text-sm">Collection publique</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter le jeu'}
        </button>
      </form>
    </main>
  )
}