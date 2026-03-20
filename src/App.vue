<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
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

        <!-- Authentication Section -->
        <div class="mt-6 border-t border-slate-200 pt-4">
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Account
          </h3>
          <div v-if="!authStore.isAuthenticated" class="space-y-2">
            <RouterLink to="/login" class="block">
              <Button
                label="Login"
                class="w-full"
                severity="info"
                outlined
                @click="() => {}"
              />
            </RouterLink>
            <RouterLink to="/signup" class="block">
              <Button label="Sign Up" class="w-full" severity="success" @click="() => {}" />
            </RouterLink>
          </div>
          <div v-else class="space-y-2">
            <p class="mb-2 text-sm text-gray-700">
              <span class="font-semibold">{{ authStore.user?.fullName }}</span>
            </p>
            <Button
              label="Logout"
              class="w-full"
              severity="danger"
              outlined
              @click="handleLogout"
            />
          </div>
        </div>
      </aside>

      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <RouterView />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
