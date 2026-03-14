import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type TodoTask = {
  id: string
  title: string
  reminder: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'vue-learning-todolist'

export const useTodolistStore = defineStore('todolist', () => {
  const tasks = ref<TodoTask[]>([])
  const title = ref('')
  const reminder = ref('')
  const editingTaskId = ref<string | null>(null)
  const errorMessage = ref('')

  const isEditing = computed(() => editingTaskId.value !== null)

  function resetForm() {
    title.value = ''
    reminder.value = ''
    editingTaskId.value = null
    errorMessage.value = ''
  }

  function saveTasksToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  }

  function loadTasksFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      tasks.value = []
      return
    }

    try {
      const parsed = JSON.parse(raw) as TodoTask[]
      tasks.value = Array.isArray(parsed) ? parsed : []
    } catch {
      tasks.value = []
    }
  }

  function validateInput() {
    if (!title.value.trim()) {
      errorMessage.value = 'Task title is required.'
      return false
    }

    errorMessage.value = ''
    return true
  }

  function addTask() {
    if (!validateInput()) {
      return
    }

    const now = new Date().toISOString()
    tasks.value.unshift({
      id: crypto.randomUUID(),
      title: title.value.trim(),
      reminder: reminder.value,
      createdAt: now,
      updatedAt: now,
    })
    saveTasksToStorage()
    resetForm()
  }

  function startEdit(task: TodoTask) {
    editingTaskId.value = task.id
    title.value = task.title
    reminder.value = task.reminder
    errorMessage.value = ''
  }

  function saveEdit() {
    if (!editingTaskId.value || !validateInput()) {
      return
    }

    const task = tasks.value.find((item) => item.id === editingTaskId.value)
    if (!task) {
      resetForm()
      return
    }

    task.title = title.value.trim()
    task.reminder = reminder.value
    task.updatedAt = new Date().toISOString()

    saveTasksToStorage()
    resetForm()
  }

  function deleteTask(taskId: string) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
    if (editingTaskId.value === taskId) {
      resetForm()
    }

    saveTasksToStorage()
  }

  function formatReminder(reminderValue: string) {
    if (!reminderValue) {
      return 'No reminder'
    }

    const date = new Date(reminderValue)
    if (Number.isNaN(date.getTime())) {
      return 'Invalid reminder'
    }

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }

  return {
    tasks,
    title,
    reminder,
    errorMessage,
    isEditing,
    loadTasksFromStorage,
    addTask,
    startEdit,
    saveEdit,
    deleteTask,
    resetForm,
    formatReminder,
  }
})


