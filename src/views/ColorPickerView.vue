<script setup lang="ts">
import { useColorPicker } from '@/stores/useColorPicker.ts'

const { selectedColor, colorText, errorMessage, presetColors, updateFromPicker, updateFromText, applyPreset } =
  useColorPicker()
</script>

<template>
  <div class="mx-auto w-full max-w-3xl">
    <h1 class="text-2xl font-semibold text-slate-800">Color Picker</h1>
    <p class="mt-1 text-sm text-slate-600">Pick a color, type a HEX value, and preview it live.</p>

    <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div class="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
        <input
          v-model="selectedColor"
          type="color"
          class="h-14 w-20 cursor-pointer rounded border border-slate-300 bg-white p-1"
          @input="updateFromPicker"
        />

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700" for="hex-color">HEX Color</label>
          <div class="flex gap-2">
            <input
              id="hex-color"
              v-model="colorText"
              type="text"
              placeholder="#3B82F6"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
              @blur="updateFromText"
              @keyup.enter="updateFromText"
            />
            <button
              type="button"
              class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              @click="updateFromText"
            >
              Apply
            </button>
          </div>
          <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 rounded-xl border border-slate-200 bg-white p-4">
      <p class="text-sm font-medium text-slate-700">Preview</p>
      <div class="mt-3 h-36 w-full rounded-lg border border-slate-200" :style="{ backgroundColor: selectedColor }" />
      <p class="mt-3 text-sm text-slate-600">Selected: <span class="font-semibold text-slate-900">{{ colorText }}</span></p>
    </div>

    <div class="mt-6 rounded-xl border border-slate-200 bg-white p-4">
      <p class="text-sm font-medium text-slate-700">Presets</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="color in presetColors"
          :key="color"
          type="button"
          class="h-9 w-9 rounded-md border border-slate-200 shadow-sm"
          :style="{ backgroundColor: color }"
          :title="color.toUpperCase()"
          @click="applyPreset(color)"
        />
      </div>
    </div>
  </div>
</template>

