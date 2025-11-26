import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, MessageSquare, DollarSign, TrendingUp, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const userGrowthData = [
  { month: "Jun", users: 120 },
  { month: "Jul", users: 180 },
  { month: "Ago", users: 250 },
  { month: "Sep", users: 320 },
  { month: "Oct", users: 450 },
  { month: "Nov", users: 580 },
];

const ticketsByTypeData = [
  { name: "Técnico", value: 45 },
  { name: "Cuenta", value: 32 },
  { name: "Consulta", value: 28 },
  { name: "Facturación", value: 15 },
];

const activityData = [
  { day: "Lun", transactions: 145 },
  { day: "Mar", transactions: 168 },
  { day: "Mié", transactions: 192 },
  { day: "Jue", transactions: 156 },
  { day: "Vie", transactions: 203 },
  { day: "Sáb", transactions: 134 },
  { day: "Dom", transactions: 98 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Vista general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Usuarios Totales</CardTitle>
            <Users className="text-indigo-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">580</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +12% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Tickets Activos</CardTitle>
            <MessageSquare className="text-yellow-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">23</div>
            <p className="text-xs text-gray-600">8 pendientes de respuesta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Ingresos Mes</CardTitle>
            <DollarSign className="text-green-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">$24,500</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +8.2% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Actividad Hoy</CardTitle>
            <Activity className="text-purple-600" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">1,234</div>
            <p className="text-xs text-gray-600">Transacciones realizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#4F46E5" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tickets by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketsByTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ticketsByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="transactions" fill="#4F46E5" name="Transacciones" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "Juan Pérez", action: "registró una nueva meta de ahorro", time: "Hace 5 min" },
              { user: "María García", action: "exportó un reporte financiero", time: "Hace 12 min" },
              { user: "Carlos López", action: "creó un ticket de soporte", time: "Hace 25 min" },
              { user: "Ana Martínez", action: "actualizó su perfil", time: "Hace 1 hora" },
              { user: "Pedro Sánchez", action: "agregó un nuevo ingreso", time: "Hace 2 horas" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600">{activity.user[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      <span>{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
