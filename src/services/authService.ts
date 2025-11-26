import { apiClient } from './api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    apiClient.setToken(response.token);
    return response;
  },

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response;
  },

  // Logout
  logout(): void {
    apiClient.clearToken();
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/refresh');
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return apiClient.post('/auth/password-reset/request', { email });
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return apiClient.post('/auth/password-reset/confirm', { token, newPassword });
  },

  // verify email
  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiClient.get(`/auth/verify?token=${token}`);
  },
};
