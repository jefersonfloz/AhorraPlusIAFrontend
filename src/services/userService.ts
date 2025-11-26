import { apiClient } from './api';
import { User, ApiResponse } from '../types';

export const userService = {
  // Get user profile
  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/user/profile');
    return response.data;
  },

  // Update user profile
  async updateProfile(data: {
    name?: string;
    email?: string;
    phone?: string;
    currency?: string;
  }): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>('/user/profile', data);
    return response.data;
  },

  // Change password
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    return apiClient.post('/user/change-password', data);
  },

  // Update notification preferences
  async updateNotificationPreferences(preferences: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    transactionAlerts?: boolean;
    goalAlerts?: boolean;
    weeklyReport?: boolean;
  }): Promise<any> {
    const response = await apiClient.put<ApiResponse<any>>(
      '/user/notifications',
      preferences
    );
    return response.data;
  },

  // Get notification preferences
  async getNotificationPreferences(): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>('/user/notifications');
    return response.data;
  },

  // Update privacy settings
  async updatePrivacySettings(settings: {
    profileVisibility?: string;
    dataSharing?: boolean;
  }): Promise<any> {
    const response = await apiClient.put<ApiResponse<any>>('/user/privacy', settings);
    return response.data;
  },

  // Delete account
  async deleteAccount(password: string): Promise<{ message: string }> {
    return apiClient.post('/user/delete-account', { password });
  },

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('profilePicture', file);

    const API_BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL 
      : 'http://localhost:3000/api';

    const response = await fetch(`${API_BASE_URL}/user/profile-picture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: formData,
    });

    return response.json();
  },
};