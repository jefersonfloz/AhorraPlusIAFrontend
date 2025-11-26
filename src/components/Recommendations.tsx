import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Lightbulb, TrendingDown, AlertCircle, Target, CheckCircle, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { recommendationsService } from "../services/recommendationsService";
import type { RecommendationDTO } from "../types";
import { useAuth } from "../hooks/useAuth";

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const userId = user?.id ? Number(user.id) : 0;

  useEffect(() => {
    if (userId) {
      loadRecommendations();
    }
  }, [userId]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const recs = await recommendationsService.getUserRecommendations(userId);
      
      // Filtrar solo recomendaciones sugeridas
      const filteredRecs = recs.filter(r => 
        (r.estado === 'SUGERIDA' || r.status === 'SUGERIDA')
      );
      
      setRecommendations(filteredRecs);
    } catch (error) {
      console.error('Error cargando recomendaciones:', error);
      toast.error('Error al cargar recomendaciones');
    } finally {
      setLoading(false);
    }
  };

  const parseRecommendationMessage = (message: string | undefined): Array<{ id: number; text: string }> => {
    if (!message) return [];
    
    const lines = message.split('\n').filter(line => line.trim());
    return lines.map((line, index) => ({
      id: index,
      text: line.replace(/^\d+\.\s*/, ''), // Remover "1. ", "2. ", etc.
    }));
  };

  const getTypeFromMessage = (message: string | undefined): string => {
    if (!message) return 'tip';
    
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('ahorro') || lowerMessage.includes('ahorrar')) return 'tip';
    if (lowerMessage.includes('gasto') || lowerMessage.includes('reducir')) return 'warning';
    if (lowerMessage.includes('peligro') || lowerMessage.includes('alerta')) return 'alert';
    if (lowerMessage.includes('excelente') || lowerMessage.includes('bien')) return 'success';
    return 'tip';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertCircle className="text-yellow-600" size={24} />;
      case "alert": return <TrendingDown className="text-red-600" size={24} />;
      case "tip": return <Target className="text-indigo-600" size={24} />;
      case "success": return <CheckCircle className="text-green-600" size={24} />;
      default: return <Lightbulb className="text-indigo-600" size={24} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "warning": return "border-l-4 border-yellow-500 bg-yellow-50";
      case "alert": return "border-l-4 border-red-500 bg-red-50";
      case "tip": return "border-l-4 border-indigo-500 bg-indigo-50";
      case "success": return "border-l-4 border-green-500 bg-green-50";
      default: return "border-l-4 border-gray-500 bg-gray-50";
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await recommendationsService.updateRecommendationStatus(id, 'ACEPTADA');
      toast.success("Recomendación aceptada");
      setRecommendations(recommendations.filter(rec => rec.id !== id));
    } catch (error) {
      console.error('Error al aceptar recomendación:', error);
      toast.error("Error al aceptar recomendación");
    }
  };

  const handleIgnore = async (id: number) => {
    try {
      await recommendationsService.updateRecommendationStatus(id, 'RECHAZADA');
      toast.info("Recomendación ignorada");
      setRecommendations(recommendations.filter(rec => rec.id !== id));
    } catch (error) {
      console.error('Error al ignorar recomendación:', error);
      toast.error("Error al ignorar recomendación");
    }
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Fecha desconocida';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recomendaciones Inteligentes</h1>
        <p className="text-gray-600">Consejos personalizados generados con IA basados en tus finanzas</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec) => {
          // Usar message o content dependiendo de cuál esté disponible
          const messageContent = rec.message || rec.content || '';
          const parsedItems = parseRecommendationMessage(messageContent);
          const type = getTypeFromMessage(messageContent);
          const creationDate = rec.fechaCreacion || rec.creationDate;
          
          return (
            <Card key={rec.id} className={getColor(type)}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Análisis Financiero IA
                    </h3>
                    
                    {parsedItems.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        {parsedItems.map((item) => (
                          <p key={item.id} className="text-gray-700 flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{item.text}</span>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700 mb-4">
                        No hay contenido disponible para esta recomendación.
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                      <span>{formatDate(creationDate)}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAccept(rec.id)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Aceptar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleIgnore(rec.id)}
                      >
                        <X size={16} className="mr-1" />
                        Ignorar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {recommendations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Lightbulb className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay recomendaciones nuevas</h3>
              <p className="text-gray-600">
                ¡Excelente! Estás al día con todas las sugerencias. Registra nuevos ingresos o gastos para recibir análisis actualizados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-indigo-600" />
            Consejos Generales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>Mantén un fondo de emergencia equivalente a 3-6 meses de gastos</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>Revisa tus gastos semanalmente para detectar fugas de dinero</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>Aplica la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorro</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>Automatiza tus ahorros para cumplir tus metas sin esfuerzo</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}