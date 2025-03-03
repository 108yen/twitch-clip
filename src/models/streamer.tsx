export interface Streamer {
  broadcaster_type?: string
  created_at?: string
  description?: string
  display_name?: string
  follower_num?: number
  id: string
  login?: string
  offline_image_url?: string
  profile_image_url?: string
  teams?: Team[]
  type?: string
  view_count?: number
}

export interface Team {
  background_image_url?: string
  banner?: string
  created_at?: string
  display_name?: string
  id?: string
  info?: string
  name?: string
  thumbnail_url?: string
  updated_at?: string
}
