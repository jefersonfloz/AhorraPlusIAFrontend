import { apiClient } from './api';
import { ApiResponse } from '../types';

export const reportsService = {
  // Get report data by type and period
  async getReportData(
    reportType: 'income' | 'expense' | 'savings' | 'full',
    startDate: string,
    endDate: string
  ): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/reports/${reportType}?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },

  // Export report to PDF
  async exportToPDF(
    reportType: string,
    startDate: string,
    endDate: string
  ): Promise<Blob> {
    const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL 
      : 'http://localhost:3001/api';
    
    const response = await fetch(
      `${API_BASE_URL}/reports/export/pdf?type=${reportType}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    return response.blob();
  },

  // Export report to Excel
  async exportToExcel(
    reportType: string,
    startDate: string,
    endDate: string
  ): Promise<Blob> {
    const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL 
      : 'http://localhost:3000/api';
    
    const response = await fetch(
      `${API_BASE_URL}/reports/export/excel?type=${reportType}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    return response.blob();
  },

  // Get financial trends
  async getFinancialTrends(period: 'week' | 'month' | 'quarter' | 'year'): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(`/reports/trends?period=${period}`);
    return response.data;
  },

  // Get category analysis
  async getCategoryAnalysis(
    type: 'income' | 'expense',
    startDate: string,
    endDate: string
  ): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/reports/categories/${type}?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
};