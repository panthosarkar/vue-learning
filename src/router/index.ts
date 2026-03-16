import { createRouter, createWebHistory } from 'vue-router'

import ColorPickerView from '@/views/ColorPickerView.vue'
import CounterView from '@/views/CounterView.vue'
import ExpenseTrackerView from '@/views/ExpenseTrackerView.vue'
import HomeView from '@/views/HomeView.vue'
import TodolistView from '@/views/TodolistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/counter',
      name: 'counter',
      component: CounterView,
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodolistView,
    },
    {
      path: '/color-picker',
      name: 'color-picker',
      component: ColorPickerView,
    },
    {
      path: '/expense-tracker',
      name: 'expense-tracker',
      component: ExpenseTrackerView,
    },
  ],
})

export default router
