import { apiClient } from './api';
import { SavingsGoal } from '../types';

// DTO para crear una meta (lo que enviamos al backend)
interface CreateGoalDTO {
  name: string;
  targetAmount: number;
  endDate: string;
  priority: string;
  frequency?: string;
  startDate?: string; 
}

export const savingsService = {
  // Obtener todas las metas
  async getSavingsGoals(userId: number): Promise<SavingsGoal[]> {
    // apiClient.get ya devuelve la data desestructurada
    return await apiClient.get<SavingsGoal[]>(`/savings-goals/all/${userId}`);
  },

  // Crear meta
  async createSavingsGoal(userId: number, goal: CreateGoalDTO): Promise<SavingsGoal> {
    return await apiClient.post<SavingsGoal>(`/savings-goals/${userId}`, goal);
  },

  // Actualizar meta
  async updateSavingsGoal(idGoal: number, userId: number, goal: Partial<SavingsGoal>): Promise<SavingsGoal> {
    return await apiClient.put<SavingsGoal>(`/savings-goals/${idGoal}/${userId}`, goal);
  },

  // Eliminar meta
  async deleteSavingsGoal(idGoal: number, userId: number): Promise<void> {
    await apiClient.delete(`/savings-goals/${idGoal}/${userId}`);
  },

  // Abonar dinero
  async addToSavingsGoal(idGoal: number, userId: number, amount: number): Promise<SavingsGoal> {
    return await apiClient.post<SavingsGoal>(
      `/savings-goals/${idGoal}/${userId}/add`,
      { amount }
    );
  },

  // Retirar dinero
  async withdrawFromSavingsGoal(idGoal: number, userId: number, amount: number): Promise<SavingsGoal> {
    return await apiClient.post<SavingsGoal>(
      `/savings-goals/${idGoal}/${userId}/withdraw`,
      { amount }
    );
  }
};