import { apiClient } from './api';
import { User, Ticket, AdminStats, ApiResponse, PaginatedResponse } from '../types';

export const adminService = {
  // Dashboard Stats
  async getAdminStats(): Promise<AdminStats> {
    const response = await apiClient.get<ApiResponse<AdminStats>>('/admin/stats');
    return response.data;
  },

  async getChartData(chartType: string): Promise<any[]> {
    const response = await apiClient.get<ApiResponse<any[]>>(`/admin/charts/${chartType}`);
    return response.data;
  },

  async getRecentActivity(limit: number = 10): Promise<any[]> {
    const response = await apiClient.get<ApiResponse<any[]>>(
      `/admin/activity?limit=${limit}`
    );
    return response.data;
  },

  // User Management
  async getAllUsers(page: number = 1, limit: number = 50): Promise<PaginatedResponse<User>> {
    return apiClient.get<PaginatedResponse<User>>(`/admin/users?page=${page}&limit=${limit}`);
  },

  async getUserById(userId: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/admin/users/${userId}`);
    return response.data;
  },

  async updateUserStatus(
    userId: string,
    status: 'Activo' | 'Inactivo' | 'Suspendido'
  ): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      `/admin/users/${userId}/status`,
      { status }
    );
    return response.data;
  },

  async updateUserPlan(userId: string, plan: 'Free' | 'Premium' | 'Enterprise'): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      `/admin/users/${userId}/plan`,
      { plan }
    );
    return response.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
  },

  // Support/Ticket Management
  async getAllTickets(filters?: {
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Ticket>> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    return apiClient.get<PaginatedResponse<Ticket>>(
      `/admin/tickets?${params.toString()}`
    );
  },

  async getTicketById(ticketId: number): Promise<Ticket> {
    const response = await apiClient.get<ApiResponse<Ticket>>(`/admin/tickets/${ticketId}`);
    return response.data;
  },

  async respondToTicket(ticketId: number, message: string): Promise<Ticket> {
    const response = await apiClient.post<ApiResponse<Ticket>>(
      `/admin/tickets/${ticketId}/respond`,
      { message }
    );
    return response.data;
  },

  async updateTicketStatus(
    ticketId: number,
    status: 'Pendiente' | 'En proceso' | 'Resuelto'
  ): Promise<Ticket> {
    const response = await apiClient.patch<ApiResponse<Ticket>>(
      `/admin/tickets/${ticketId}/status`,
      { status }
    );
    return response.data;
  },

  async updateTicketPriority(
    ticketId: number,
    priority: 'Baja' | 'Media' | 'Alta'
  ): Promise<Ticket> {
    const response = await apiClient.patch<ApiResponse<Ticket>>(
      `/admin/tickets/${ticketId}/priority`,
      { priority }
    );
    return response.data;
  },

  // Analytics
  async getAnalyticsData(metric: string, period?: string): Promise<any> {
    const params = period ? `?period=${period}` : '';
    const response = await apiClient.get<ApiResponse<any>>(
      `/admin/analytics/${metric}${params}`
    );
    return response.data;
  },

  // System Settings
  async getSystemSettings(): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>('/admin/settings');
    return response.data;
  },

  async updateSystemSettings(settings: any): Promise<any> {
    const response = await apiClient.put<ApiResponse<any>>('/admin/settings', settings);
    return response.data;
  },

  async performBackup(): Promise<{ message: string; backupId: string }> {
    return apiClient.post('/admin/backup');
  },
};
