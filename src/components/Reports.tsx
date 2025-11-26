import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Mail, FileText } from "lucide-react";
import { toast } from "sonner";

const monthlyData = [
  { month: "Ene", ingresos: 4200, gastos: 2500 },
  { month: "Feb", ingresos: 3800, gastos: 2800 },
  { month: "Mar", ingresos: 4500, gastos: 2600 },
  { month: "Abr", ingresos: 4800, gastos: 3200 },
  { month: "May", ingresos: 4500, gastos: 2800 },
  { month: "Jun", ingresos: 5200, gastos: 3100 },
];

const categoryData = [
  { name: "Supermercado", value: 850 },
  { name: "Servicios", value: 580 },
  { name: "Transporte", value: 420 },
  { name: "Entretenimiento", value: 350 },
  { name: "Otros", value: 600 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function Reports() {
  const [reportType, setReportType] = useState("monthly");

  const handleExportPDF = () => {
    toast.success("Reporte PDF generado exitosamente");
  };

  const handleShareEmail = () => {
    toast.success("Reporte enviado por correo");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Reportes Financieros</h1>
          <p className="text-gray-600">Analiza tu actividad financiera</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleExportPDF}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Download size={18} className="mr-2" />
            Exportar PDF
          </Button>
          <Button
            onClick={handleShareEmail}
            variant="outline"
          >
            <Mail size={18} className="mr-2" />
            Compartir
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tipo de Reporte</CardTitle>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensual</SelectItem>
                <SelectItem value="annual">Anual</SelectItem>
                <SelectItem value="comparative">Comparativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Ingresos</p>
                <p className="text-green-600 mt-1">$27,000.00</p>
              </div>
              <FileText className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Gastos</p>
                <p className="text-red-600 mt-1">$17,000.00</p>
              </div>
              <FileText className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Balance Neto</p>
                <p className="text-indigo-600 mt-1">+$10,000.00</p>
              </div>
              <FileText className="text-indigo-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="gastos" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparativa por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
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

        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
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
            <CardTitle>Detalle de Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-gray-900">${category.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
