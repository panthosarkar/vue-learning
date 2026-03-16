import { computed, defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import ExpenseEntryForm from '@/components/ExpenseEntryForm.vue'
import ExpenseEntryList from '@/components/ExpenseEntryList.vue'
import ExpenseSummary from '@/components/ExpenseSummary.vue'
import { useExpenseTrackerStore, type ExpenseType } from '@/stores/expenseTracker'

export default defineComponent({
  name: 'ExpenseTrackerView',
  components: {
    ExpenseEntryForm,
    ExpenseEntryList,
    ExpenseSummary,
  },
  setup() {
    const expenseStore = useExpenseTrackerStore()
    const { entries, title, amount, type, errorMessage, balance, totalIncome, totalExpense } =
      storeToRefs(expenseStore)
    const { addEntry, deleteEntry, loadEntriesFromStorage, formatCurrency } = expenseStore

    const balanceFormatted = computed(() => formatCurrency(balance.value))
    const totalIncomeFormatted = computed(() => formatCurrency(totalIncome.value))
    const totalExpenseFormatted = computed(() => formatCurrency(totalExpense.value))

    function onTypeChange(value: ExpenseType) {
      type.value = value
    }

    onMounted(() => {
      loadEntriesFromStorage()
    })

    return {
      entries,
      title,
      amount,
      type,
      errorMessage,
      addEntry,
      deleteEntry,
      onTypeChange,
      formatCurrency,
      balanceFormatted,
      totalIncomeFormatted,
      totalExpenseFormatted,
    }
  },
})

