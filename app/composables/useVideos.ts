import axios from 'axios'
import { api } from '~/services/api'
import type { Video, VideoResponse } from '~/types/video'

const videosPerPage = 6

export function useVideos() {
  const videos = ref<Video[]>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function fetchVideos(search = '') {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get<VideoResponse>('/videos', {
        params: {
          fields: 'id,title,thumbnail_480_url,duration,views_total,url,allow_embed',
          limit: videosPerPage,
          page: currentPage.value,
          search: search || undefined,
          sort: 'trending',
        },
      })

      videos.value = data.list.filter(video => video.allow_embed)
      totalPages.value = Math.max(1, Math.ceil(data.total / videosPerPage))
    }
    catch (error: unknown) {
      videos.value = []
      errorMessage.value = axios.isAxiosError(error)
        ? 'The video service is currently unavailable.'
        : 'Something went wrong.'
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    videos,
    currentPage,
    totalPages,
    isLoading,
    errorMessage,
    fetchVideos,
  }
}
