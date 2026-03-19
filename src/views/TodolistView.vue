<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

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

	<Card class="mt-6">
	  <template #content>
		<form @submit.prevent="isEditing ? saveEdit() : addTask()">
		  <div class="grid gap-3 md:grid-cols-[1fr_220px_auto]">
			<InputText v-model="title" placeholder="Task title" class="w-full" />
			<InputText v-model="reminder" type="datetime-local" class="w-full" />
			<Button type="submit" :label="isEditing ? 'Save' : 'Add Task'" icon="pi pi-check" />
		  </div>

		  <div class="mt-3 flex flex-wrap items-center gap-3">
			<Message v-if="errorMessage" severity="error" size="small" variant="simple">
			  {{ errorMessage }}
			</Message>
			<Button
			  v-if="isEditing"
			  type="button"
			  severity="secondary"
			  text
			  label="Cancel edit"
			  @click="resetForm"
			/>
		  </div>
		</form>
	  </template>
	</Card>

	<div class="mt-6 space-y-3">
	  <Card
		v-for="task in tasks"
		:key="task.id"
		class="shadow-sm"
	  >
		<template #content>
		  <div class="flex flex-wrap items-start justify-between gap-3">
			<div>
			  <p class="text-base font-medium text-slate-900">{{ task.title }}</p>
			  <p class="mt-1 text-sm text-slate-600">Reminder: {{ formatReminder(task.reminder) }}</p>
			</div>

			<div class="flex items-center gap-2">
			  <Button
				type="button"
				label="Edit"
				icon="pi pi-pencil"
				severity="warn"
				size="small"
				@click="startEdit(task)"
			  />
			  <Button
				type="button"
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				size="small"
				@click="deleteTask(task.id)"
			  />
			</div>
		  </div>
		</template>
	  </Card>

	  <Card
		v-if="tasks.length === 0"
		class="text-center"
	  >
		<template #content>
		  <p class="text-sm text-slate-500">No tasks yet. Add your first one above.</p>
		</template>
	  </Card>
	</div>
  </div>
</template>

