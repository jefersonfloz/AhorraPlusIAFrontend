// services/transactions.ts
import { apiClient } from './api';
import type { Income, Expense, IncomeDTO, ExpenseDTO } from '../types';

export const transactionService = {
  // ============ INCOME APIs ============
  async getIncomes(userId: number): Promise<Income[]> {
    return await apiClient.get<Income[]>(`/incomes/all/${userId}`);
  },

  async createIncome(userId: number, income: IncomeDTO): Promise<Income> {
    return await apiClient.post<Income>(`/incomes/${userId}`, income);
  },

  async updateIncome(idIncome: number, userId: number, income: IncomeDTO): Promise<Income> {
    return await apiClient.put<Income>(`/incomes/${idIncome}/${userId}`, income);
  },

  async deleteIncome(idIncome: number, userId: number): Promise<void> {
    await apiClient.delete(`/incomes/${idIncome}/${userId}`);
  },

  async getTotalIncome(userId: number): Promise<number> {
    return await apiClient.get<number>(`/incomes/total/${userId}`);
  },

  async getIncomeByDateRange(userId: number, start: string, end: string): Promise<number> {
    return await apiClient.get<number>(
      `/incomes/range/${userId}?start=${start}&end=${end}`
    );
  },

  // ============ EXPENSE APIs ============
  async getExpenses(userId: number): Promise<Expense[]> {
    return await apiClient.get<Expense[]>(`/expenses/all/${userId}`);
  },

  async createExpense(userId: number, expense: ExpenseDTO): Promise<Expense> {
    return await apiClient.post<Expense>(`/expenses/${userId}`, expense);
  },

  async updateExpense(idExpense: number, userId: number, expense: ExpenseDTO): Promise<Expense> {
    return await apiClient.put<Expense>(`/expenses/${idExpense}/${userId}`, expense);
  },

  async deleteExpense(idExpense: number, userId: number): Promise<void> {
    await apiClient.delete(`/expenses/${idExpense}/${userId}`);
  },

  async getTotalExpenses(userId: number): Promise<number> {
    return await apiClient.get<number>(`/expenses/total/${userId}`);
  },

  async getExpensesByDateRange(userId: number, start: string, end: string): Promise<number> {
    return await apiClient.get<number>(
      `/expenses/range/${userId}?start=${start}&end=${end}`
    );
  },

  async getAnomalousExpenses(userId: number): Promise<Expense[]> {
    return await apiClient.get<Expense[]>(`/expenses/anomalous/${userId}`);
  },

  // BALANCE CALCULATION 
  async getBalance(userId: number): Promise<number> {
    const [totalIncome, totalExpenses] = await Promise.all([
      this.getTotalIncome(userId),
      this.getTotalExpenses(userId)
    ]);
    return totalIncome - totalExpenses;
  }
};