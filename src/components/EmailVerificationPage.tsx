import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "./ui/button";

export function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
  const token = new URLSearchParams(location.search).get("token");

  if (!token) {
    setStatus("error");
    return;
  }

  const safeToken = token as string; // <-- 🔥 Solución

  async function verify() {
    try {
      await authService.verifyEmail(safeToken);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  verify();
}, [location.search]);


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full text-center p-6">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {status === "loading" ? (
              <Loader2 size={48} className="animate-spin text-indigo-600" />
            ) : (
              <MailCheck size={48} className="text-indigo-600" />
            )}
          </div>

          <CardTitle className="text-indigo-600 text-2xl">
            {status === "loading" && "Verificando tu cuenta..."}
            {status === "success" && "¡Correo verificado!"}
            {status === "error" && "Error al verificar"}
          </CardTitle>

          <CardDescription>
            {status === "loading" && "Por favor espera unos segundos..."}
            {status === "success" && "Tu correo fue verificado exitosamente. Ahora puedes iniciar sesión."}
            {status === "error" && "El enlace no es válido o ha expirado."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {status !== "loading" && (
            <Button 
              onClick={() => navigate("/login")} 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Ir al inicio de sesión
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
