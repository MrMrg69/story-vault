// Tipos corretos com `readonly` e default seguro
export type ItemType = 'movie' | 'series' | 'anime' | 'book' | 'manhwa' | 'manga' | 'game'

export interface Progress {
  season?: number
  episode?: number
  chapter?: number
  page?: number
}

export interface LibraryItem {
  id: string
  title: string
  type: ItemType
  status: 'completed' | 'watching' | 'reading' | 'planning' | 'dropped'
  progress?: Progress
  rating?: number // 0–5 (pode ser null)
  notes?: string
  where?: string
  completedAt?: string // ISO
  tags?: string[]
  isPlatinated?: boolean
  coverImage?: string
  createdAt: string
}