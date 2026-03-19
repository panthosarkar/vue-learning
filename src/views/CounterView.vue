<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment, decrement } = counterStore
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <Card class="w-full max-w-md">
      <template #title>
        <h1 class="text-center text-3xl font-semibold text-slate-800">Counter Module</h1>
      </template>

      <template #content>
        <div class="text-center">
          <p class="text-sm font-medium tracking-wide text-slate-500">Current Count</p>
          <p class="mt-2 text-6xl font-bold text-slate-900">{{ count }}</p>
          <div class="mt-3 flex justify-center">
            <Tag :value="`Double: ${doubleCount}`" severity="info" rounded />
          </div>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-3">
          <Button label="Count" icon="pi pi-plus" @click="increment" />
          <Button label="Count" icon="pi pi-minus" severity="secondary" @click="decrement" />
        </div>
      </template>
    </Card>
  </div>
</template>

