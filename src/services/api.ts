// services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// Configuración base
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Crear instancia de axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request para agregar token si existe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response para manejo de errores global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      switch (error.response.status) {
        case 401:
          // No autorizado - redirigir a login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('No tienes permisos para realizar esta acción');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error en la petición:', error.response.data);
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo sucedió al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Cliente API con métodos genéricos
export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },

  // Métodos de autenticación
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  clearToken(): void {
    localStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

export default axiosInstance;