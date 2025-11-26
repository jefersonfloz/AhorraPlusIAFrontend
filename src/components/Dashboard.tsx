import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const pieData = [
  { name: "Ingresos", value: 4500 },
  { name: "Gastos", value: 2800 },
];

const barData = [
  { month: "Ene", ingresos: 4200, gastos: 2500 },
  { month: "Feb", ingresos: 3800, gastos: 2800 },
  { month: "Mar", ingresos: 4500, gastos: 2600 },
  { month: "Abr", ingresos: 4800, gastos: 3200 },
  { month: "May", ingresos: 4500, gastos: 2800 },
];

const COLORS = ["#10B981", "#EF4444"];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Panel Principal</h1>
        <p className="text-gray-600">Resumen de tu situación financiera</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-600">Saldo Actual</CardTitle>
            <Wallet className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-indigo-600">$12,450.00</div>
            <p className="text-xs text-gray-500 mt-1">Actualizado hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-600">Ingresos del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">$4,500.00</div>
            <p className="text-xs text-gray-500 mt-1">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-600">Gastos del Mes</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-red-600">$2,800.00</div>
            <p className="text-xs text-gray-500 mt-1">-5% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-600">Ahorro</CardTitle>
            <PiggyBank className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-indigo-600">37.8%</div>
            <p className="text-xs text-gray-500 mt-1">Del total de ingresos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico (Últimos 5 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ingresos" fill="#10B981" />
                <Bar dataKey="gastos" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "ingreso", desc: "Salario mensual", amount: "+$3,500", date: "15 Nov 2025" },
              { type: "gasto", desc: "Supermercado", amount: "-$150", date: "14 Nov 2025" },
              { type: "gasto", desc: "Pago de servicios", amount: "-$280", date: "13 Nov 2025" },
              { type: "ingreso", desc: "Freelance", amount: "+$500", date: "12 Nov 2025" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === "ingreso" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {item.type === "ingreso" ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900">{item.desc}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <div className={`${
                  item.type === "ingreso" ? "text-green-600" : "text-red-600"
                }`}>
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
