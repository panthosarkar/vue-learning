<script lang="ts" src="./ExpenseTrackerView.ts"></script>

<template>
  <div class="mx-auto w-full max-w-4xl">
    <h1 class="text-2xl font-semibold text-slate-800">Expense Tracker</h1>
    <p class="mt-1 text-sm text-slate-600">Track income and expenses to keep your balance in check.</p>

    <section class="mt-6">
      <ExpenseEntryForm
        v-model:title="title"
        v-model:amount="amount"
        :type="type"
        :error-message="errorMessage"
        @update:type="onTypeChange"
        @submit="addEntry"
      />
    </section>

    <section class="mt-4">
      <ExpenseSummary
        :balance="balanceFormatted"
        :total-income="totalIncomeFormatted"
        :total-expense="totalExpenseFormatted"
      />
    </section>

    <section class="mt-6">
      <ExpenseEntryList :entries="entries" :format-currency="formatCurrency" @delete="deleteEntry" />
    </section>
  </div>
</template>

