import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MessageSquare, Clock, CheckCircle, AlertCircle, Send, User, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Ticket {
  id: number;
  userId: string;
  userName: string;
  type: string;
  subject: string;
  description: string;
  status: "Pendiente" | "En proceso" | "Resuelto";
  priority: "Baja" | "Media" | "Alta";
  date: string;
  responses: { author: string; message: string; date: string; isAdmin: boolean }[];
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    userId: "U001",
    userName: "Juan Pérez",
    type: "Técnico",
    subject: "Error al exportar reporte",
    description: "Cuando intento exportar el reporte mensual a PDF, aparece un error y no se descarga el archivo.",
    status: "Pendiente",
    priority: "Alta",
    date: "2025-11-18",
    responses: [],
  },
  {
    id: 2,
    userId: "U002",
    userName: "María García",
    type: "Cuenta",
    subject: "No puedo cambiar mi contraseña",
    description: "He intentado cambiar mi contraseña varias veces pero siempre me dice que la contraseña actual es incorrecta.",
    status: "En proceso",
    priority: "Media",
    date: "2025-11-17",
    responses: [
      {
        author: "María García",
        message: "He intentado cambiar mi contraseña varias veces pero siempre me dice que la contraseña actual es incorrecta.",
        date: "2025-11-17 10:30",
        isAdmin: false,
      },
      {
        author: "Soporte Admin",
        message: "Hola María, estamos investigando el problema. ¿Podrías intentar resetear tu contraseña usando el enlace 'Olvidé mi contraseña'?",
        date: "2025-11-17 11:15",
        isAdmin: true,
      },
    ],
  },
  {
    id: 3,
    userId: "U003",
    userName: "Carlos López",
    type: "Consulta",
    subject: "¿Cómo crear metas compartidas?",
    description: "Me gustaría saber si es posible crear metas de ahorro compartidas con mi pareja.",
    status: "Resuelto",
    priority: "Baja",
    date: "2025-11-15",
    responses: [
      {
        author: "Carlos López",
        message: "Me gustaría saber si es posible crear metas de ahorro compartidas con mi pareja.",
        date: "2025-11-15 14:20",
        isAdmin: false,
      },
      {
        author: "Soporte Admin",
        message: "Hola Carlos, actualmente no contamos con la función de metas compartidas, pero está en nuestra hoja de ruta. Te notificaremos cuando esté disponible.",
        date: "2025-11-15 15:45",
        isAdmin: true,
      },
    ],
  },
  {
    id: 4,
    userId: "U004",
    userName: "Ana Martínez",
    type: "Facturación",
    subject: "Cobro duplicado en mi tarjeta",
    description: "Se me ha cobrado dos veces la suscripción premium este mes.",
    status: "Pendiente",
    priority: "Alta",
    date: "2025-11-19",
    responses: [],
  },
  {
    id: 5,
    userId: "U005",
    userName: "Pedro Sánchez",
    type: "Sugerencia",
    subject: "Modo oscuro para la app",
    description: "Sería genial tener un modo oscuro para usar la aplicación de noche.",
    status: "En proceso",
    priority: "Baja",
    date: "2025-11-16",
    responses: [
      {
        author: "Pedro Sánchez",
        message: "Sería genial tener un modo oscuro para usar la aplicación de noche.",
        date: "2025-11-16 20:10",
        isAdmin: false,
      },
      {
        author: "Soporte Admin",
        message: "¡Excelente sugerencia Pedro! Lo hemos agregado a nuestra lista de mejoras futuras. Gracias por tu feedback.",
        date: "2025-11-17 09:30",
        isAdmin: true,
      },
    ],
  },
];

export function AdminSupport() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const handleRespond = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !responseMessage.trim()) return;

    const newResponse = {
      author: "Soporte Admin",
      message: responseMessage,
      date: new Date().toLocaleString(),
      isAdmin: true,
    };

    setTickets(tickets.map(ticket => 
      ticket.id === selectedTicket.id
        ? { ...ticket, responses: [...ticket.responses, newResponse], status: "En proceso" }
        : ticket
    ));

    setResponseMessage("");
    toast.success("Respuesta enviada exitosamente");
    
    // Update selected ticket
    setSelectedTicket({
      ...selectedTicket,
      responses: [...selectedTicket.responses, newResponse],
      status: "En proceso",
    });
  };

  const handleStatusChange = (ticketId: number, newStatus: "Pendiente" | "En proceso" | "Resuelto") => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
    toast.success(`Estado actualizado a: ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resuelto":
        return <Badge className="bg-green-100 text-green-800">Resuelto</Badge>;
      case "En proceso":
        return <Badge className="bg-yellow-100 text-yellow-800">En proceso</Badge>;
      case "Pendiente":
        return <Badge className="bg-red-100 text-red-800">Pendiente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "Media":
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>;
      case "Baja":
        return <Badge className="bg-blue-100 text-blue-800">Baja</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resuelto":
        return <CheckCircle className="text-green-600" size={20} />;
      case "En proceso":
        return <Clock className="text-yellow-600" size={20} />;
      case "Pendiente":
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return <MessageSquare className="text-gray-600" size={20} />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus === "all" || ticket.status === filterStatus;
    const priorityMatch = filterPriority === "all" || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const stats = {
    total: tickets.length,
    pending: tickets.filter(t => t.status === "Pendiente").length,
    inProgress: tickets.filter(t => t.status === "En proceso").length,
    resolved: tickets.filter(t => t.status === "Resuelto").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Gestión de Soporte</h1>
        <p className="text-gray-600">Monitorea y responde tickets de usuarios</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">En Proceso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-yellow-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Resueltos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label>Filtrar por estado</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En proceso">En proceso</SelectItem>
                  <SelectItem value="Resuelto">Resuelto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Filtrar por prioridad</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(ticket.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{ticket.subject}</h3>
                        {getPriorityBadge(ticket.priority)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {ticket.userName} ({ticket.userId})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(ticket.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                          {ticket.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        Ver detalles y responder
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{ticket.subject}</DialogTitle>
                        <DialogDescription>
                          Ticket #{ticket.id} - {ticket.userName} ({ticket.userId})
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {/* Ticket Info */}
                        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Estado:</span>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(ticket.status)}
                              <Select
                                value={ticket.status}
                                onValueChange={(value) => handleStatusChange(ticket.id, value as any)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                                  <SelectItem value="En proceso">En proceso</SelectItem>
                                  <SelectItem value="Resuelto">Resuelto</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Prioridad:</span>
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Tipo:</span>
                            <span className="text-sm">{ticket.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Fecha:</span>
                            <span className="text-sm">{new Date(ticket.date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Conversation */}
                        <div className="space-y-3">
                          <h4 className="text-sm text-gray-600">Conversación</h4>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {/* Initial message */}
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-sm">
                                  {ticket.userName[0]}
                                </div>
                                <div>
                                  <p className="text-sm text-gray-900">{ticket.userName}</p>
                                  <p className="text-xs text-gray-600">{ticket.date}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">{ticket.description}</p>
                            </div>

                            {/* Responses */}
                            {ticket.responses.map((response, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg ${
                                  response.isAdmin ? "bg-indigo-50 ml-4" : "bg-blue-50 mr-4"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                      response.isAdmin ? "bg-indigo-200" : "bg-blue-200"
                                    }`}
                                  >
                                    {response.author[0]}
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-900">{response.author}</p>
                                    <p className="text-xs text-gray-600">{response.date}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700">{response.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Response Form */}
                        <form onSubmit={handleRespond} className="space-y-3 pt-3 border-t">
                          <Label>Responder al ticket</Label>
                          <Textarea
                            placeholder="Escribe tu respuesta..."
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            rows={4}
                            required
                          />
                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                            >
                              <Send size={16} className="mr-2" />
                              Enviar Respuesta
                            </Button>
                          </div>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Select
                    value={ticket.status}
                    onValueChange={(value) => handleStatusChange(ticket.id, value as any)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En proceso">En proceso</SelectItem>
                      <SelectItem value="Resuelto">Resuelto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600">No hay tickets que coincidan con los filtros</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
