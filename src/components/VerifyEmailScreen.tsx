import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function VerifyEmailScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full text-center p-6">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <MailCheck size={48} className="text-indigo-600" />
          </div>

          <CardTitle className="text-indigo-600 text-2xl">
            ¡Verifica tu correo!
          </CardTitle>

          <CardDescription>
            Hemos enviado un enlace de verificación a tu correo electrónico.
            Debes confirmar tu cuenta antes de poder iniciar sesión.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Si no ves el correo en tu bandeja de entrada, revisa la carpeta de <b>spam</b> o 
            <b> correo no deseado</b>.
          </p>

          <Button 
            onClick={() => navigate("/login")} 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Volver al inicio de sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
