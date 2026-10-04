import axios from 'axios'
import { api } from '~/services/api'
import type { Video } from '~/types/video'

export function useVideo() {
  const video = ref<Video | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function fetchVideo(id: string) {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get<Video>(`/video/${id}`, {
        params: {
          fields: 'id,title,thumbnail_480_url,duration,views_total,url,allow_embed',
        },
      })

      video.value = data
    }
    catch (error: unknown) {
      errorMessage.value = axios.isAxiosError(error)
        ? 'This video could not be loaded.'
        : 'Something went wrong.'
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    video,
    isLoading,
    errorMessage,
    fetchVideo,
  }
}
