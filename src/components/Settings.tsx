import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Bell, Lock, User, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    goals: true,
    budgetAlerts: true,
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
    toast.success("Preferencia actualizada");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    toast.success("Contraseña actualizada exitosamente");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    toast.success("Solicitud de eliminación procesada. Recibirás un correo de confirmación.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Administra tu cuenta y preferencias</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={20} />
            Información de Perfil
          </CardTitle>
          <CardDescription>
            Actualiza tu información personal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" defaultValue="Juan Pérez" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" defaultValue="juan@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" type="tel" defaultValue="+52 555 123 4567" />
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Save size={18} className="mr-2" />
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Controla cómo y cuándo recibes notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Notificaciones por email</p>
              <p className="text-sm text-gray-600">Recibe actualizaciones por correo</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => handleNotificationChange("email", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Notificaciones push</p>
              <p className="text-sm text-gray-600">Alertas en tiempo real</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => handleNotificationChange("push", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Resumen semanal</p>
              <p className="text-sm text-gray-600">Reporte de tu actividad financiera</p>
            </div>
            <Switch
              checked={notifications.weekly}
              onCheckedChange={(checked) => handleNotificationChange("weekly", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Recordatorios de metas</p>
              <p className="text-sm text-gray-600">Alertas sobre progreso de metas</p>
            </div>
            <Switch
              checked={notifications.goals}
              onCheckedChange={(checked) => handleNotificationChange("goals", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Alertas de presupuesto</p>
              <p className="text-sm text-gray-600">Aviso cuando superes límites</p>
            </div>
            <Switch
              checked={notifications.budgetAlerts}
              onCheckedChange={(checked) => handleNotificationChange("budgetAlerts", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock size={20} />
            Seguridad
          </CardTitle>
          <CardDescription>
            Actualiza tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Cambiar Contraseña
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 size={20} />
            Zona Peligrosa
          </CardTitle>
          <CardDescription>
            Acciones irreversibles en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Eliminar mi cuenta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos,
                  incluyendo ingresos, gastos, metas y reportes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sí, eliminar mi cuenta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
