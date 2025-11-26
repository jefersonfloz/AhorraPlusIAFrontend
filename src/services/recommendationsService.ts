import { apiClient } from './api';
import type { RecommendationDTO, RecommendationStatus } from '../types';

export const recommendationsService = {
  //Obtener todas las recomendaciones de un usuario

  async getUserRecommendations(userId: number): Promise<RecommendationDTO[]> {
    try {
      return await apiClient.get<RecommendationDTO[]>(`/recommendations/user/${userId}`);
    } catch (error) {
      console.error('Error obteniendo recomendaciones:', error);
      throw error;
    }
  },

  //Generar nueva recomendación usando IA
  async generateAIRecommendation(userId: number): Promise<RecommendationDTO> {
    try {
      return await apiClient.post<RecommendationDTO>(`/recommendations/generate/${userId}`, {});
    } catch (error) {
      console.error('Error generando recomendación:', error);
      throw error;
    }
  },

  // Actualizar estado de una recomendación
  
  async updateRecommendationStatus(
    recommendationId: number, 
    status: RecommendationStatus | 'ACEPTADA' | 'RECHAZADA' | 'SUGERIDA' | 'COMPLETADA'
  ): Promise<RecommendationDTO> {
    try {
      return await apiClient.patch<RecommendationDTO>(
        `/recommendations/${recommendationId}/status`,
        { status }
      );
    } catch (error) {
      console.error('Error actualizando estado:', error);
      throw error;
    }
  },

  // Marcar recomendación como leída
  async markAsRead(recommendationId: number): Promise<void> {
    try {
      await apiClient.patch(`/recommendations/${recommendationId}/read`, {});
    } catch (error) {
      console.error('Error marcando como leída:', error);
      throw error;
    }
  },

  // Eliminar/descartar recomendación
  async dismissRecommendation(recommendationId: number): Promise<void> {
    try {
      await apiClient.delete(`/recommendations/${recommendationId}`);
    } catch (error) {
      console.error('Error eliminando recomendación:', error);
      throw error;
    }
  },

  // Obtener estadísticas de recomendaciones
  async getRecommendationStats(userId: number): Promise<{
    total: number;
    sugeridas: number;
    aceptadas: number;
    rechazadas: number;
    completadas: number;
  }> {
    try {
      return await apiClient.get(`/recommendations/stats/${userId}`);
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  },

  // Obtener recomendaciones por estado

  async getRecommendationsByStatus(
    userId: number, 
    status: RecommendationStatus | string
  ): Promise<RecommendationDTO[]> {
    try {
      const allRecommendations = await this.getUserRecommendations(userId);
      return allRecommendations.filter(rec => 
        rec.status === status || rec.estado === status
      );
    } catch (error) {
      console.error('Error filtrando recomendaciones:', error);
      throw error;
    }
  },

  // Marcar recomendación como útil/no útil

  async markUseful(recommendationId: number, isUseful: boolean): Promise<void> {
    try {
      await apiClient.patch(`/recommendations/${recommendationId}/useful`, { 
        fueUtil: isUseful 
      });
    } catch (error) {
      console.error('Error marcando utilidad:', error);
      throw error;
    }
  }
};