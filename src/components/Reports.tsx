import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Filter, Loader2, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { reportsService } from "../services/reportsService";
import type { ReportData } from "../types";
import { toast } from "sonner";

export function Reports() {
  const { user } = useAuth();
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("6m"); // Estado inicial de 6 meses

  const userId = user?.id ? Number(user.id) : 0;

  // Carga los datos cada vez que el usuario cambia el periodo o al iniciar
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const response = await reportsService.getFinancialReports(userId, period);
        setData(response);
      } catch (error) {
        console.error("Error al cargar reportes:", error);
        toast.error("No se pudo conectar con el servidor de reportes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, period]);

  // Pantalla de carga
  if (loading && !data) {
    return (
      <div className="flex flex-col justify-center items-center h-[500px] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        <p className="text-gray-500 font-medium">Generando tu análisis financiero...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado con Selector de Periodo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reportes Financieros</h1>
          <p className="text-gray-600">Visualiza el balance real de tus ingresos y gastos</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border">
          <Filter className="w-4 h-4 text-indigo-600 ml-2" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Este Mes</SelectItem>
              <SelectItem value="3m">Últimos 3 Meses</SelectItem>
              <SelectItem value="6m">Últimos 6 Meses</SelectItem>
              <SelectItem value="1y">Este Año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Resumen en Tarjetas (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-emerald-900">
                ${data?.totalIncome.toLocaleString('es-CO')}
              </span>
              <div className="bg-emerald-200 p-2 rounded-full">
                <TrendingUp className="text-emerald-700 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-rose-700 uppercase tracking-wider">Gastos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-rose-900">
                ${data?.totalExpense.toLocaleString('es-CO')}
              </span>
              <div className="bg-rose-200 p-2 rounded-full">
                <TrendingDown className="text-rose-700 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">Ahorro Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-indigo-900">
                ${data?.netSavings.toLocaleString('es-CO')}
              </span>
              <div className="bg-indigo-200 p-2 rounded-full">
                <Wallet className="text-indigo-700 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfica de Barras Principal */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Comparativa Mensual</CardTitle>
          <CardDescription>Flujo de caja detallado mes a mes</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.monthlyStats} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#6b7280', fontSize: 13}}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#6b7280', fontSize: 13}}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              <Bar 
                dataKey="income" 
                name="Ingresos" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                barSize={35}
              />
              <Bar 
                dataKey="expense" 
                name="Gastos" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Mensaje si no hay datos */}
      {data?.monthlyStats.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-gray-500 italic">No hay transacciones registradas en este periodo para generar la gráfica.</p>
        </div>
      )}
    </div>
  );
}