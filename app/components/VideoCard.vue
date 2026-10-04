<script setup lang="ts">
import type { Video } from '../types/video.ts'

const props = defineProps<{
  video: Video
}>()

const duration = computed(() => {
  const minutes = Math.floor(props.video.duration / 60)
  const seconds = props.video.duration % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <NuxtLink
    :to="`/videos/${video.id}`"
    class="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="relative aspect-video overflow-hidden bg-slate-200">
      <img
        :src="video.thumbnail_480_url"
        :alt="video.title"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      >
      <span class="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-1 text-xs text-white">
        {{ duration }}
      </span>
    </div>

    <div class="p-4">
      <h2 class="line-clamp-2 font-semibold leading-6 text-slate-900">
        {{ video.title }}
      </h2>
      <p class="mt-2 text-sm text-slate-500">
        {{ video.views_total.toLocaleString() }} views
      </p>
    </div>
  </NuxtLink>
</template>
