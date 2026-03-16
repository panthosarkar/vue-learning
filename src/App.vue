<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen w-full bg-slate-100">
    <section class="mx-auto grid w-full max-w-5xl gap-4 p-4 md:grid-cols-[220px_1fr] md:p-6">
      <aside class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Pages</h2>
        <ul class="space-y-2">
          <li>
            <RouterLink
              to="/"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              active-class="bg-blue-100 text-blue-700"
              exact-active-class="bg-blue-100 text-blue-700"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/counter"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              active-class="bg-blue-100 text-blue-700"
            >
              Counter
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/todolist"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              active-class="bg-blue-100 text-blue-700"
            >
              Todo List
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/color-picker"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              active-class="bg-blue-100 text-blue-700"
            >
              Color Picker
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/expense-tracker"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              active-class="bg-blue-100 text-blue-700"
            >
              Expense Tracker
            </RouterLink>
          </li>
        </ul>
      </aside>

      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <RouterView />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
