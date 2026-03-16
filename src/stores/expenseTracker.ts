import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ExpenseType = 'income' | 'expense'

export type ExpenseEntry = {
  id: string
  title: string
  amount: number
  type: ExpenseType
  createdAt: string
}

const STORAGE_KEY = 'vue-learning-expense-tracker'

export const useExpenseTrackerStore = defineStore('expenseTracker', () => {
  const entries = ref<ExpenseEntry[]>([])
  const title = ref('')
  const amount = ref('')
  const type = ref<ExpenseType>('expense')
  const errorMessage = ref('')

  const totalIncome = computed(() =>
    entries.value.filter((entry) => entry.type === 'income').reduce((sum, entry) => sum + entry.amount, 0),
  )

  const totalExpense = computed(() =>
    entries.value.filter((entry) => entry.type === 'expense').reduce((sum, entry) => sum + entry.amount, 0),
  )

  const balance = computed(() => totalIncome.value - totalExpense.value)

  function resetForm() {
    title.value = ''
    amount.value = ''
    type.value = 'expense'
    errorMessage.value = ''
  }

  function saveEntriesToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
  }

  function loadEntriesFromStorage() {
    const rawEntries = localStorage.getItem(STORAGE_KEY)
    if (!rawEntries) {
      entries.value = []
      return
    }

    try {
      const parsed = JSON.parse(rawEntries) as ExpenseEntry[]
      entries.value = Array.isArray(parsed) ? parsed : []
    } catch {
      entries.value = []
    }
  }

  function validateForm() {
    if (!title.value.trim()) {
      errorMessage.value = 'Title is required.'
      return false
    }

    const parsedAmount = Number(amount.value)
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      errorMessage.value = 'Amount must be a number greater than 0.'
      return false
    }

    errorMessage.value = ''
    return true
  }

  function addEntry() {
    if (!validateForm()) {
      return
    }

    entries.value.unshift({
      id: crypto.randomUUID(),
      title: title.value.trim(),
      amount: Number(amount.value),
      type: type.value,
      createdAt: new Date().toISOString(),
    })

    saveEntriesToStorage()
    resetForm()
  }

  function deleteEntry(entryId: string) {
    entries.value = entries.value.filter((entry) => entry.id !== entryId)
    saveEntriesToStorage()
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return {
    entries,
    title,
    amount,
    type,
    errorMessage,
    totalIncome,
    totalExpense,
    balance,
    loadEntriesFromStorage,
    addEntry,
    deleteEntry,
    formatCurrency,
  }
})

