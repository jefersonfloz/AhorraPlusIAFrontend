import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { toast } from "sonner";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, isAdminLogin);
      toast.success("¡Inicio de sesión exitoso!");
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-indigo-600 flex items-center gap-2">
              {isAdminLogin ? <Shield size={24} /> : <User size={24} />}
              {isAdminLogin ? "Panel Administrativo" : "Bienvenido de nuevo"}
            </CardTitle>
            <CardDescription>
              {isAdminLogin 
                ? "Acceso exclusivo para administradores del sistema"
                : "Ingresa tus credenciales para acceder a tu cuenta"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Login Type Toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setIsAdminLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${
                  !isAdminLogin 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-gray-600"
                }`}
              >
                <User size={16} />
                Usuario
              </button>
              <button
                type="button"
                onClick={() => setIsAdminLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${
                  isAdminLogin 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-gray-600"
                }`}
              >
                <Shield size={16} />
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={isAdminLogin ? "admin@financeapp.com" : "tu@email.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-indigo-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : (isAdminLogin ? "Acceso Administrativo" : "Iniciar sesión")}
              </Button>

              {!isAdminLogin && (
                <div className="text-center text-sm text-gray-600">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-indigo-600 hover:underline"
                    disabled={isLoading}
                  >
                    Crear cuenta
                  </button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="hidden md:flex flex-col items-center justify-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=500&fit=crop"
            alt="Financial illustration"
            className="w-full max-w-md rounded-2xl"
          />
          <p className="mt-6 text-gray-600 text-center">
            Gestiona tus finanzas de manera inteligente y alcanza tus metas
          </p>
        </div>
      </div>
    </div>
  );
}