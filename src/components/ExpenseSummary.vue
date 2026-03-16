<script setup lang="ts">
defineProps<{
  balance: string
  totalIncome: string
  totalExpense: string
}>()
</script>

<template>
  <div class="grid gap-3 md:grid-cols-3">
    <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <p class="text-xs font-medium uppercase tracking-wide text-emerald-700">Income</p>
      <p class="mt-2 text-2xl font-semibold text-emerald-800">{{ totalIncome }}</p>
    </div>

    <div class="rounded-xl border border-rose-200 bg-rose-50 p-4">
      <p class="text-xs font-medium uppercase tracking-wide text-rose-700">Expenses</p>
      <p class="mt-2 text-2xl font-semibold text-rose-800">{{ totalExpense }}</p>
    </div>

    <div class="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p class="text-xs font-medium uppercase tracking-wide text-blue-700">Balance</p>
      <p class="mt-2 text-2xl font-semibold text-blue-800">{{ balance }}</p>
    </div>
  </div>
</template>

