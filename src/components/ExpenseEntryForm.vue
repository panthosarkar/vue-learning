<script setup lang="ts">
import type { ExpenseType } from '@/stores/expenseTracker'

defineProps<{
  title: string
  amount: string
  type: ExpenseType
  errorMessage: string
}>()

const emit = defineEmits<{
  'update:title': [value: string]
  'update:amount': [value: string]
  'update:type': [value: ExpenseType]
  submit: []
}>()
</script>

<template>
  <form class="rounded-xl border border-slate-200 bg-slate-50 p-4" @submit.prevent="emit('submit')">
    <div class="grid gap-3 md:grid-cols-[1fr_150px_140px_auto]">
      <input
        :value="title"
        type="text"
        placeholder="Title (salary, groceries, rent...)"
        class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
        @input="emit('update:title', ($event.target as HTMLInputElement).value)"
      />

      <input
        :value="amount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Amount"
        class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
        @input="emit('update:amount', ($event.target as HTMLInputElement).value)"
      />

      <select
        :value="type"
        class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
        @change="emit('update:type', ($event.target as HTMLSelectElement).value as ExpenseType)"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Add
      </button>
    </div>

    <p v-if="errorMessage" class="mt-3 text-sm text-red-600">{{ errorMessage }}</p>
  </form>
</template>

