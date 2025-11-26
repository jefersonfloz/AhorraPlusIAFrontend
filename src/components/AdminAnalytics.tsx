import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

const revenueData = [
  { month: "Ene", revenue: 12400, expenses: 8200 },
  { month: "Feb", revenue: 15600, expenses: 9100 },
  { month: "Mar", revenue: 18200, expenses: 10300 },
  { month: "Abr", revenue: 19800, expenses: 11200 },
  { month: "May", revenue: 21400, expenses: 10800 },
  { month: "Jun", revenue: 23100, expenses: 11500 },
  { month: "Jul", revenue: 25800, expenses: 12100 },
  { month: "Ago", revenue: 24600, expenses: 11900 },
  { month: "Sep", revenue: 26400, expenses: 12400 },
  { month: "Oct", revenue: 28100, expenses: 13200 },
  { month: "Nov", revenue: 29500, expenses: 13800 },
];

const userActivityData = [
  { hour: "00:00", users: 12 },
  { hour: "04:00", users: 5 },
  { hour: "08:00", users: 45 },
  { hour: "12:00", users: 89 },
  { hour: "16:00", users: 72 },
  { hour: "20:00", users: 56 },
  { hour: "23:00", users: 23 },
];

const planDistribution = [
  { name: "Free", value: 320, percentage: 55 },
  { name: "Premium", value: 180, percentage: 31 },
  { name: "Enterprise", value: 80, percentage: 14 },
];

const categorySpending = [
  { category: "Vivienda", amount: 45000 },
  { category: "Alimentación", amount: 32000 },
  { category: "Transporte", amount: 28000 },
  { category: "Entretenimiento", amount: 18000 },
  { category: "Salud", amount: 22000 },
  { category: "Educación", amount: 15000 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Analíticas Avanzadas</h1>
        <p className="text-gray-600">Métricas detalladas y análisis de datos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Ingresos Totales</CardTitle>
            <DollarSign className="text-green-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">$259,500</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +18.2% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Usuarios Activos</CardTitle>
            <Users className="text-blue-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">402</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +24 esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Tasa Conversión</CardTitle>
            <TrendingUp className="text-purple-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">31.2%</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +5.1% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Retención</CardTitle>
            <TrendingDown className="text-orange-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">87.5%</div>
            <p className="text-xs text-red-600 flex items-center gap-1">
              <TrendingDown size={14} />
              -2.3% vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Ingresos vs Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Ingresos"
                dot={{ fill: '#10B981' }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Gastos"
                dot={{ fill: '#EF4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad de Usuarios (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#4F46E5" radius={[8, 8, 0, 0]} name="Usuarios Activos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Planes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Spending */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoría (Total Usuarios)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categorySpending} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="amount" fill="#4F46E5" radius={[0, 8, 8, 0]} name="Monto ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-gray-600">Mes</th>
                  <th className="text-left p-3 text-sm text-gray-600">Ingresos</th>
                  <th className="text-left p-3 text-sm text-gray-600">Gastos</th>
                  <th className="text-left p-3 text-sm text-gray-600">Beneficio</th>
                  <th className="text-left p-3 text-sm text-gray-600">Margen</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.slice(-6).reverse().map((data, index) => {
                  const profit = data.revenue - data.expenses;
                  const margin = ((profit / data.revenue) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm">{data.month}</td>
                      <td className="p-3 text-sm text-green-600">${data.revenue.toLocaleString()}</td>
                      <td className="p-3 text-sm text-red-600">${data.expenses.toLocaleString()}</td>
                      <td className="p-3 text-sm text-indigo-600">${profit.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        <span className={profit > 0 ? "text-green-600" : "text-red-600"}>
                          {margin}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
