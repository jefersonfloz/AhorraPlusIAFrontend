import { apiClient } from './api';
import { ReportData } from '../types';

export const reportsService = {
  /**
   * Obtiene los datos del reporte financiero desde el backend
   * @param userId ID del usuario logueado
   * @param period Periodo de tiempo (1m, 3m, 6m, 1y)
   */
  async getFinancialReports(userId: number, period: string = "6m"): Promise<ReportData> {
    // Llama a: GET /api/v1/reports/{userId}?period=xxx
    return await apiClient.get<ReportData>(`/reports/${userId}`, {
      params: { period }
    });
  }
};