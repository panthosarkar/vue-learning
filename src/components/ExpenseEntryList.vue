<script setup lang="ts">
import type { ExpenseEntry } from '@/stores/expenseTracker'

defineProps<{
  entries: ExpenseEntry[]
  formatCurrency: (value: number) => string
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()
</script>

<template>
  <div class="space-y-3">
    <article
      v-for="entry in entries"
      :key="entry.id"
      class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-base font-medium text-slate-900">{{ entry.title }}</p>
          <p class="mt-1 text-xs uppercase tracking-wide text-slate-500">{{ entry.type }}</p>
        </div>

        <div class="flex items-center gap-3">
          <p
            class="text-base font-semibold"
            :class="entry.type === 'income' ? 'text-emerald-700' : 'text-rose-700'"
          >
            {{ entry.type === 'income' ? '+' : '-' }}{{ formatCurrency(entry.amount) }}
          </p>
          <button
            type="button"
            class="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
            @click="emit('delete', entry.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </article>

    <div
      v-if="entries.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500"
    >
      No transactions yet. Add your first income or expense above.
    </div>
  </div>
</template>

