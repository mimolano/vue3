<script setup lang="ts">
const currentPage = defineModel<number>({ required: true })

const props = defineProps<{
  totalPages: number
}>()

function previousPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < props.totalPages) currentPage.value++
}
</script>

<template>
  <nav
    class="mt-8 flex items-center justify-center gap-4"
    aria-label="Pagination"
  >
    <button
      type="button"
      :disabled="currentPage === 1"
      class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      @click="previousPage"
    >
      Previous
    </button>

    <span class="text-sm text-slate-600">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      @click="nextPage"
    >
      Next
    </button>
  </nav>
</template>
