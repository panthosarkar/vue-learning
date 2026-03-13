<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment, decrement } = counterStore
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h1 class="text-center text-4xl font-semibold text-slate-800">Counter Module</h1>

      <div class="mt-8 text-center">
        <p class="text-sm font-medium tracking-wide text-slate-500">Current Count</p>
        <p class="mt-2 text-6xl font-bold text-slate-900">{{ count }}</p>
        <p class="mt-2 text-sm text-slate-500">Double: {{ doubleCount }}</p>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-3">
        <button
          type="button"
          class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          @click="increment"
        >
          Count++
        </button>
        <button
          type="button"
          class="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
          @click="decrement"
        >
          --Count
        </button>
      </div>
    </div>
  </div>
</template>

