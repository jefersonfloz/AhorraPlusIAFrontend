import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { toast } from "sonner";
import { CheckedState } from "@radix-ui/react-checkbox"

export function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }
    
    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      setShowSuccess(true);
      toast.success("¡Registro exitoso! Redirigiendo...");
    } catch (error: any) {
      toast.error(error.message || "Error al registrar. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-indigo-600">Crear cuenta</CardTitle>
          <CardDescription>
            Completa tus datos para registrarte en FinanzasApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSuccess ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ¡Registro exitoso! Se ha enviado un correo de confirmación a tu email.
                Redirigiendo...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked: CheckedState) =>
                    setFormData({ ...formData, acceptTerms: checked === true })
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto los términos de privacidad y condiciones de uso
                </label>
              </div>

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarme"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:underline"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}