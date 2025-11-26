import { apiClient } from './api';
import { DashboardStats, ChartData, ApiResponse } from '../types';

export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  },

  // Get monthly chart data
  async getMonthlyChartData(): Promise<ChartData[]> {
    const response = await apiClient.get<ApiResponse<ChartData[]>>('/dashboard/chart/monthly');
    return response.data;
  },

  // Get category breakdown
  async getCategoryBreakdown(): Promise<ChartData[]> {
    const response = await apiClient.get<ApiResponse<ChartData[]>>('/dashboard/chart/categories');
    return response.data;
  },

  // Get recent transactions
  async getRecentTransactions(limit: number = 5): Promise<any[]> {
    const response = await apiClient.get<ApiResponse<any[]>>(
      `/dashboard/transactions/recent?limit=${limit}`
    );
    return response.data;
  },

  // Get financial summary by period
  async getFinancialSummary(period: 'week' | 'month' | 'year'): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/dashboard/summary?period=${period}`
    );
    return response.data;
  },
};
