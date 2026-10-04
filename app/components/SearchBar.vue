<script setup lang="ts">
const model = defineModel<string>({ required: true })

const emit = defineEmits<{
  search: []
}>()
</script>

<template>
  <form
    class="mb-8"
    @submit.prevent="emit('search')"
  >
    <label
      for="search"
      class="mb-2 block text-sm font-medium text-slate-700"
    >
      Search videos
    </label>
    <div class="flex gap-3">
      <input
        id="search"
        v-model="model"
        type="search"
        placeholder="Try music, travel, sport..."
        class="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
      <button
        type="submit"
        class="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  </form>
</template>
