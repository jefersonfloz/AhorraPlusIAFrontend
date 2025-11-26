import { apiClient } from './api';
import { Ticket, ApiResponse } from '../types';

export const supportService = {
  // Get all tickets (for current user)
  async getTickets(): Promise<Ticket[]> {
    const response = await apiClient.get<ApiResponse<Ticket[]>>('/support/tickets');
    return response.data;
  },

  // Get ticket by ID
  async getTicketById(id: number): Promise<Ticket> {
    const response = await apiClient.get<ApiResponse<Ticket>>(`/support/tickets/${id}`);
    return response.data;
  },

  // Create new ticket
  async createTicket(ticket: {
    type: string;
    subject: string;
    description: string;
  }): Promise<Ticket> {
    const response = await apiClient.post<ApiResponse<Ticket>>('/support/tickets', ticket);
    return response.data;
  },

  // Add response to ticket
  async addTicketResponse(ticketId: number, message: string): Promise<Ticket> {
    const response = await apiClient.post<ApiResponse<Ticket>>(
      `/support/tickets/${ticketId}/responses`,
      { message }
    );
    return response.data;
  },

  // Update ticket status (user can only mark as resolved)
  async updateTicketStatus(ticketId: number, status: string): Promise<Ticket> {
    const response = await apiClient.patch<ApiResponse<Ticket>>(
      `/support/tickets/${ticketId}/status`,
      { status }
    );
    return response.data;
  },
};
