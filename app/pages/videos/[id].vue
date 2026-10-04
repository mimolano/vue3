<script setup lang="ts">
const route = useRoute()
const { video, isLoading, errorMessage, fetchVideo } = useVideo()

const videoId = computed(() => String(route.params.id))

const embedUrl = computed(() => {
  return `https://geo.dailymotion.com/player.html?video=${videoId.value}`
})

onMounted(() => {
  fetchVideo(videoId.value)
})
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
    <div class="mx-auto max-w-4xl">
      <NuxtLink
        to="/"
        class="text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Back to videos
      </NuxtLink>

      <div
        v-if="isLoading"
        class="py-20 text-center text-slate-500"
      >
        Loading video...
      </div>

      <div
        v-else-if="errorMessage"
        class="mt-8 rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700"
      >
        {{ errorMessage }}
      </div>

      <article
        v-else-if="video"
        class="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div
          v-if="video.allow_embed"
          class="aspect-video bg-black"
        >
          <iframe
            :src="embedUrl"
            :title="video.title"
            class="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          />
        </div>

        <div
          v-else
          class="flex aspect-video items-center justify-center bg-slate-900 px-6 text-center text-white"
        >
          <div>
            <p class="font-medium">
              This video cannot be embedded.
            </p>
            <a
              :href="video.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 inline-block text-sm text-indigo-300 hover:text-indigo-200"
            >
              Watch on Dailymotion
            </a>
          </div>
        </div>

        <div class="p-6">
          <h1 class="text-2xl font-bold">
            {{ video.title }}
          </h1>
          <p class="mt-2 text-sm text-slate-500">
            {{ video.views_total.toLocaleString() }} views
          </p>

          <a
            :href="video.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            View on Dailymotion
          </a>
        </div>
      </article>
    </div>
  </main>
</template>
