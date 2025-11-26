import { apiClient } from './api';
import { SavingsGoal, ApiResponse } from '../types';

export const savingsService = {
  // Get all savings goals
  async getSavingsGoals(): Promise<SavingsGoal[]> {
    const response = await apiClient.get<ApiResponse<SavingsGoal[]>>('/savings-goals');
    return response.data;
  },

  // Create new savings goal
  async createSavingsGoal(goal: Omit<SavingsGoal, 'id' | 'currentAmount'>): Promise<SavingsGoal> {
    const response = await apiClient.post<ApiResponse<SavingsGoal>>('/savings-goals', goal);
    return response.data;
  },

  // Update savings goal
  async updateSavingsGoal(id: number, goal: Partial<SavingsGoal>): Promise<SavingsGoal> {
    const response = await apiClient.put<ApiResponse<SavingsGoal>>(`/savings-goals/${id}`, goal);
    return response.data;
  },

  // Delete savings goal
  async deleteSavingsGoal(id: number): Promise<void> {
    await apiClient.delete(`/savings-goals/${id}`);
  },

  // Add money to savings goal
  async addToSavingsGoal(id: number, amount: number): Promise<SavingsGoal> {
    const response = await apiClient.post<ApiResponse<SavingsGoal>>(
      `/savings-goals/${id}/add`,
      { amount }
    );
    return response.data;
  },

  // Withdraw money from savings goal
  async withdrawFromSavingsGoal(id: number, amount: number): Promise<SavingsGoal> {
    const response = await apiClient.post<ApiResponse<SavingsGoal>>(
      `/savings-goals/${id}/withdraw`,
      { amount }
    );
    return response.data;
  },
};
