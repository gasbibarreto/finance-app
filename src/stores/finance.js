import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import dataJson from '@/assets/data/data.json';
export const useFinanceStore = defineStore('finance', () => {
    // Estado reativo dos dados
    const balance = reactive({ ...dataJson.balance });
    const transactions = ref([...dataJson.transactions]);
    const budgets = ref([...dataJson.budgets]);
    const pots = ref([...dataJson.pots]);
    // Computed para balance atualizado
    const updatedBalance = computed(() => {
        const income = transactions.value
            .filter((t) => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = Math.abs(transactions.value.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
        return {
            current: income - expenses,
            income,
            expenses,
        };
    });
    // Funções para manipular transações
    function addTransaction(transaction) {
        transactions.value.unshift(transaction);
        updateBalance();
    }
    function updateTransaction(index, updatedTransaction) {
        if (transactions.value[index]) {
            Object.assign(transactions.value[index], updatedTransaction);
            updateBalance();
        }
    }
    function deleteTransaction(index) {
        if (transactions.value[index]) {
            transactions.value.splice(index, 1);
            updateBalance();
        }
    }
    function deleteTransactionById(date, name) {
        const index = transactions.value.findIndex((t) => t.date === date && t.name === name);
        if (index !== -1) {
            transactions.value.splice(index, 1);
            updateBalance();
        }
    }
    const recurringBillsPaid = computed(() => {
        // capturar pagamentos com data anterior a hoje
        const dateToday = new Date().getDate();
        const paidBillsPerDate = transactions.value.filter((bill) => {
            const billDate = new Date(bill.date).getDate();
            if (bill.recurring === true && billDate < dateToday) {
                return bill.amount;
            }
        });
        const total = Math.ceil(Math.abs(paidBillsPerDate.reduce((total, bill) => total + (bill.amount ?? 0), 0)));
        const count = paidBillsPerDate.length ?? 0;
        return {
            total,
            count,
        };
    });
    const recurringBillsUpcoming = computed(() => {
        // capturar pagamentos com data posterior a hoje
        const dateToday = new Date().getDate();
        const upcomingBillsPerDate = transactions.value.filter((bill) => {
            const billDate = new Date(bill.date).getDate();
            if (bill.recurring === true && billDate >= dateToday) {
                return bill.amount;
            }
        });
        const total = Math.ceil(Math.abs(upcomingBillsPerDate.reduce((total, bill) => total + (bill.amount ?? 0), 0)));
        const count = upcomingBillsPerDate.length ?? 0;
        return {
            total,
            count,
        };
    });
    const recurringBillsDue = computed(() => {
        // capturar pagamentos com data igual a hoje
        const dateToday = new Date().getDate();
        const dueBillsPerDate = transactions.value.filter((bill) => {
            const billDate = new Date(bill.date).getDate();
            if (bill.recurring === true && billDate === dateToday) {
                return bill.amount;
            }
        });
        const total = Math.ceil(Math.abs(dueBillsPerDate.reduce((total, bill) => total + (bill.amount ?? 0), 0)));
        const count = dueBillsPerDate.length ?? 0;
        return {
            total,
            count,
        };
    });
    // Funções para manipular budgets
    function addBudget(newBudget) {
        budgets.value.push(newBudget);
    }
    function updateBudget(category, updatedBudget) {
        const budgetIndex = budgets.value.findIndex((budget) => budget.category.toLowerCase() === category.toLowerCase());
        if (budgetIndex !== -1 && budgets.value[budgetIndex]) {
            Object.assign(budgets.value[budgetIndex], updatedBudget);
        }
        else {
            alert(`Budget "${category}" not found to update`);
        }
    }
    function deleteBudget(category) {
        const budgetIndex = budgets.value.findIndex((budget) => budget.category.toLowerCase() === category.toLowerCase());
        if (budgetIndex !== -1 && budgets.value[budgetIndex]) {
            budgets.value.splice(budgetIndex, 1);
        }
        else {
            alert(`Budget "${category}" not found to delete`);
        }
    }
    // Funções para manipular pots
    function addPot(newPot) {
        const existingPot = pots.value.find((pot) => pot.name.toLowerCase() === newPot.name.toLowerCase());
        if (existingPot) {
            alert(`Pot "${newPot.name}" already exists`);
            return;
        }
        else {
            pots.value.push(newPot);
        }
    }
    function updatePot(name, updatedPot) {
        const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase());
        if (potIndex !== -1 && pots.value[potIndex]) {
            Object.assign(pots.value[potIndex], updatedPot);
        }
        else {
            alert(`Pot "${name}" not found to update`);
        }
    }
    function deletePot(name) {
        const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase());
        if (pots.value[potIndex]) {
            console.log('potIndex', potIndex);
            pots.value.splice(potIndex, 1);
        }
        else {
            alert(`Pot "${name}" not found to delete`);
        }
    }
    function addMoneyToPot(name, amount) {
        const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase());
        console.log(potIndex);
        if (potIndex !== -1 && pots.value[potIndex]) {
            pots.value[potIndex].total += amount;
        }
        else {
            alert(`Pot "${name}" not found to add money`);
        }
    }
    function withdrawMoneyFromPot(name, amount) {
        const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase());
        if (potIndex !== -1 && pots.value[potIndex] && pots.value[potIndex].total >= amount) {
            pots.value[potIndex].total -= amount;
        }
        else {
            alert(`Pot "${name}" not found to withdraw money is greater than total`);
        }
    }
    // Atualizar balance
    function updateBalance() {
        const newBalance = updatedBalance.value;
        balance.current = newBalance.current;
        balance.income = newBalance.income;
        balance.expenses = newBalance.expenses;
    }
    // Resetar para dados iniciais
    function resetData() {
        balance.current = dataJson.balance.current;
        balance.income = dataJson.balance.income;
        balance.expenses = dataJson.balance.expenses;
        transactions.value = [...dataJson.transactions];
        budgets.value = [...dataJson.budgets];
        pots.value = [...dataJson.pots];
    }
    return {
        // Estado
        balance,
        transactions,
        budgets,
        pots,
        // Computed
        updatedBalance,
        recurringBillsPaid,
        recurringBillsUpcoming,
        recurringBillsDue,
        // Funções de transações
        addTransaction,
        updateTransaction,
        deleteTransaction,
        deleteTransactionById,
        // Funções de budgets
        addBudget,
        updateBudget,
        deleteBudget,
        // Funções de pots
        addPot,
        updatePot,
        deletePot,
        addMoneyToPot,
        withdrawMoneyFromPot,
        // Utilitários
        updateBalance,
        resetData,
    };
});
