<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useTodolistStore } from '../stores/todolist'

const todoStore = useTodolistStore()
const { tasks, title, reminder, errorMessage, isEditing } = storeToRefs(todoStore)
const { addTask, deleteTask, formatReminder, loadTasksFromStorage, resetForm, saveEdit, startEdit } =
  todoStore

onMounted(() => {
  loadTasksFromStorage()
})
</script>

<template>
  <div class="mx-auto w-full max-w-3xl">
	<h1 class="text-2xl font-semibold text-slate-800">Todo List</h1>
	<p class="mt-1 text-sm text-slate-600">Add tasks, set reminders, edit, and delete anytime.</p>

	<form
	  class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4"
	  @submit.prevent="isEditing ? saveEdit() : addTask()"
	>
	  <div class="grid gap-3 md:grid-cols-[1fr_220px_auto]">
		<input
		  v-model="title"
		  type="text"
		  placeholder="Task title"
		  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
		/>
		<input
		  v-model="reminder"
		  type="datetime-local"
		  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
		/>
		<button
		  type="submit"
		  class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
		>
		  {{ isEditing ? 'Save' : 'Add Task' }}
		</button>
	  </div>

	  <div class="mt-3 flex flex-wrap items-center gap-3">
		<p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
		<button
		  v-if="isEditing"
		  type="button"
		  class="text-sm font-medium text-slate-600 underline-offset-2 hover:text-slate-800 hover:underline"
		  @click="resetForm"
		>
		  Cancel edit
		</button>
	  </div>
	</form>

	<div class="mt-6 space-y-3">
	  <div
		v-for="task in tasks"
		:key="task.id"
		class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
	  >
		<div class="flex flex-wrap items-start justify-between gap-3">
		  <div>
			<p class="text-base font-medium text-slate-900">{{ task.title }}</p>
			<p class="mt-1 text-sm text-slate-600">Reminder: {{ formatReminder(task.reminder) }}</p>
		  </div>

		  <div class="flex items-center gap-2">
			<button
			  type="button"
			  class="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600"
			  @click="startEdit(task)"
			>
			  Edit
			</button>
			<button
			  type="button"
			  class="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
			  @click="deleteTask(task.id)"
			>
			  Delete
			</button>
		  </div>
		</div>
	  </div>

	  <div
		v-if="tasks.length === 0"
		class="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500"
	  >
		No tasks yet. Add your first one above.
	  </div>
	</div>
  </div>
</template>

