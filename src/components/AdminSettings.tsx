import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Settings, Mail, Bell, Shield, Database, Globe } from "lucide-react";
import { toast } from "sonner";

export function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSaveSettings = () => {
    toast.success("Configuración guardada exitosamente");
  };

  const handleBackupDatabase = () => {
    toast.success("Backup de base de datos iniciado");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Configuración del Sistema</h1>
        <p className="text-gray-600">Gestiona la configuración general de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Configuración General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Nombre de la Aplicación</Label>
              <Input
                id="appName"
                defaultValue="FinanceApp Admin"
                placeholder="Nombre de la aplicación"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appUrl">URL de la Aplicación</Label>
              <Input
                id="appUrl"
                type="url"
                defaultValue="https://financeapp.com"
                placeholder="https://ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Email de Soporte</Label>
              <Input
                id="supportEmail"
                type="email"
                defaultValue="soporte@financeapp.com"
                placeholder="soporte@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUsers">Máximo de Usuarios</Label>
              <Input
                id="maxUsers"
                type="number"
                defaultValue="10000"
                placeholder="10000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-gray-600">Recibir alertas por correo electrónico</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones Push</Label>
                <p className="text-sm text-gray-600">Recibir notificaciones en tiempo real</p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Seguridad</Label>
                <p className="text-sm text-gray-600">Notificar intentos de acceso sospechosos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reportes Semanales</Label>
                <p className="text-sm text-gray-600">Resumen semanal de actividad</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación de Dos Factores</Label>
                <p className="text-sm text-gray-600">Requerir 2FA para administradores</p>
              </div>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Mantenimiento</Label>
                <p className="text-sm text-gray-600">Deshabilitar acceso de usuarios</p>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                defaultValue="30"
                placeholder="30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Política de Contraseñas</Label>
              <Textarea
                id="passwordPolicy"
                defaultValue="Mínimo 8 caracteres, incluir mayúsculas, minúsculas y números"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} />
              Base de Datos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-gray-600">Backup diario a las 2:00 AM</p>
              </div>
              <Switch
                checked={autoBackup}
                onCheckedChange={setAutoBackup}
              />
            </div>

            <div className="space-y-2">
              <Label>Último Backup</Label>
              <p className="text-sm text-gray-600">19 de Noviembre, 2025 - 02:00 AM</p>
            </div>

            <div className="space-y-2">
              <Label>Tamaño de Base de Datos</Label>
              <p className="text-sm text-gray-600">2.4 GB / 10 GB</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "24%" }}></div>
              </div>
            </div>

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={handleBackupDatabase}
            >
              <Database size={16} className="mr-2" />
              Realizar Backup Manual
            </Button>
          </CardContent>
        </Card>

        {/* Email Templates */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Plantillas de Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="welcomeEmail">Email de Bienvenida</Label>
              <Textarea
                id="welcomeEmail"
                defaultValue="¡Bienvenido a FinanceApp! Estamos emocionados de tenerte con nosotros..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resetPasswordEmail">Email de Recuperación de Contraseña</Label>
              <Textarea
                id="resetPasswordEmail"
                defaultValue="Hemos recibido una solicitud para restablecer tu contraseña..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} />
              Configuración de API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  defaultValue="sk_live_••••••••••••••••"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  type="url"
                  defaultValue="https://api.financeapp.com/webhooks"
                  placeholder="https://ejemplo.com/webhook"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rateLimit">Rate Limit (req/min)</Label>
                <Input
                  id="rateLimit"
                  type="number"
                  defaultValue="1000"
                  placeholder="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiVersion">Versión de API</Label>
                <Input
                  id="apiVersion"
                  defaultValue="v2.1.0"
                  placeholder="v2.0.0"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={handleSaveSettings}
        >
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
