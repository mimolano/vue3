export interface Video {
  id: string
  title: string
  thumbnail_480_url: string
  duration: number
  views_total: number
  url: string
  allow_embed: boolean
}

export interface VideoResponse {
  page: number
  limit: number
  total: number
  has_more: boolean
  list: Video[]
}
