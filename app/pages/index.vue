<script setup lang="ts">
const search = ref('')

const {
  videos,
  currentPage,
  totalPages,
  isLoading,
  errorMessage,
  fetchVideos,
} = useVideos()

function searchVideos() {
  currentPage.value = 1
  fetchVideos(search.value)
}

watch(currentPage, () => {
  fetchVideos(search.value)
})

onMounted(() => {
  fetchVideos()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-6 py-6">
        <p class="text-sm font-semibold text-indigo-600">
          Video Explorer
        </p>
        <h1 class="mt-1 text-3xl font-bold tracking-tight">
          Find your next video
        </h1>
        <p class="mt-2 text-slate-600">
          Search public videos from Dailymotion.
        </p>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <SearchBar
        v-model="search"
        @search="searchVideos"
      />

      <div
        v-if="isLoading"
        class="py-16 text-center text-slate-500"
      >
        Loading videos...
      </div>

      <div
        v-else-if="errorMessage"
        class="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700"
      >
        {{ errorMessage }}
      </div>

      <div
        v-else-if="videos.length"
        class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
        />
      </div>

      <div
        v-else
        class="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
      >
        <p class="font-medium text-slate-700">
          No videos found
        </p>
        <p class="mt-1 text-sm text-slate-500">
          Try another search.
        </p>
      </div>

      <AppPagination
        v-if="!isLoading && !errorMessage && totalPages > 1"
        v-model="currentPage"
        :total-pages="totalPages"
      />
    </main>
  </div>
</template>
