import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { HelpCircle, Send, CheckCircle, Clock, FileText } from "lucide-react";
import { toast } from "sonner";

const initialTickets = [
  { id: 1, type: "Técnico", subject: "Error al exportar reporte", status: "En proceso", date: "2025-11-15" },
  { id: 2, type: "Cuenta", subject: "No puedo cambiar mi contraseña", status: "Resuelto", date: "2025-11-10" },
  { id: 3, type: "Consulta", subject: "¿Cómo crear metas compartidas?", status: "Pendiente", date: "2025-11-12" },
];

export function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      type: formData.type,
      subject: formData.subject,
      status: "Pendiente",
      date: new Date().toISOString().split('T')[0],
    };
    setTickets([newTicket, ...tickets]);
    setFormData({ type: "", subject: "", description: "" });
    toast.success("Ticket enviado exitosamente. Te responderemos pronto.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resuelto":
        return <Badge className="bg-green-100 text-green-800">Resuelto</Badge>;
      case "En proceso":
        return <Badge className="bg-yellow-100 text-yellow-800">En proceso</Badge>;
      case "Pendiente":
        return <Badge className="bg-gray-100 text-gray-800">Pendiente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resuelto":
        return <CheckCircle className="text-green-600" size={20} />;
      case "En proceso":
        return <Clock className="text-yellow-600" size={20} />;
      default:
        return <FileText className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Centro de Soporte</h1>
        <p className="text-gray-600">¿Necesitas ayuda? Estamos aquí para asistirte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle size={20} />
              Nuevo Ticket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de problema</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Técnico">Técnico</SelectItem>
                    <SelectItem value="Cuenta">Cuenta</SelectItem>
                    <SelectItem value="Facturación">Facturación</SelectItem>
                    <SelectItem value="Consulta">Consulta General</SelectItem>
                    <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  placeholder="Describe brevemente el problema"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción detallada</Label>
                <Textarea
                  id="description"
                  placeholder="Explica tu problema o consulta en detalle"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Adjuntar archivo (opcional)</Label>
                <Input
                  id="attachment"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <p className="text-xs text-gray-500">
                  Formatos: JPG, PNG, PDF, DOC (máx. 10MB)
                </p>
              </div>

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Send size={18} className="mr-2" />
                Enviar Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mis Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(ticket.status)}
                      <div>
                        <h3 className="text-gray-900 mb-1">
                          {ticket.subject}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{ticket.type}</span>
                          <span>•</span>
                          <span>{new Date(ticket.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                  
                  {ticket.status !== "Resuelto" && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        Ver detalles
                      </Button>
                      <Button size="sm" variant="outline">
                        Añadir comentario
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {tickets.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-600">No tienes tickets abiertos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-gray-900 mb-2">¿Cómo cambio mi contraseña?</h3>
              <p className="text-gray-600 text-sm">
                Ve a Configuración → Seguridad → Cambiar contraseña. Necesitarás tu contraseña actual.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="text-gray-900 mb-2">¿Puedo exportar mis datos?</h3>
              <p className="text-gray-600 text-sm">
                Sí, desde la sección de Reportes puedes exportar tus datos en formato PDF o Excel.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="text-gray-900 mb-2">¿Cómo elimino mi cuenta?</h3>
              <p className="text-gray-600 text-sm">
                En Configuración encontrarás la opción "Eliminar cuenta". Esta acción es irreversible.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">¿Mis datos están seguros?</h3>
              <p className="text-gray-600 text-sm">
                Sí, utilizamos encriptación de grado bancario y nunca compartimos tu información.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
