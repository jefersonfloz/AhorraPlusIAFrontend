import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  User, 
  Search, 
  MoreVertical, 
  Mail, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Ban,
  Check
} from "lucide-react";
import { toast } from "sonner";

interface UserData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "Activo" | "Inactivo" | "Suspendido";
  plan: "Free" | "Premium" | "Enterprise";
  totalTransactions: number;
  balance: number;
  lastActivity: string;
}

const initialUsers: UserData[] = [
  {
    id: "U001",
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    joinDate: "2025-01-15",
    status: "Activo",
    plan: "Premium",
    totalTransactions: 245,
    balance: 15420.50,
    lastActivity: "Hace 2 horas",
  },
  {
    id: "U002",
    name: "María García",
    email: "maria.garcia@email.com",
    joinDate: "2025-03-22",
    status: "Activo",
    plan: "Free",
    totalTransactions: 89,
    balance: 5230.00,
    lastActivity: "Hace 1 día",
  },
  {
    id: "U003",
    name: "Carlos López",
    email: "carlos.lopez@email.com",
    joinDate: "2024-11-05",
    status: "Activo",
    plan: "Enterprise",
    totalTransactions: 567,
    balance: 45680.75,
    lastActivity: "Hace 30 min",
  },
  {
    id: "U004",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    joinDate: "2025-05-18",
    status: "Inactivo",
    plan: "Free",
    totalTransactions: 23,
    balance: 1250.00,
    lastActivity: "Hace 15 días",
  },
  {
    id: "U005",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@email.com",
    joinDate: "2025-02-10",
    status: "Activo",
    plan: "Premium",
    totalTransactions: 178,
    balance: 22340.25,
    lastActivity: "Hace 5 horas",
  },
  {
    id: "U006",
    name: "Laura Rodríguez",
    email: "laura.rodriguez@email.com",
    joinDate: "2025-06-03",
    status: "Suspendido",
    plan: "Premium",
    totalTransactions: 145,
    balance: 8750.00,
    lastActivity: "Hace 7 días",
  },
];

export function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleStatusChange = (userId: string, newStatus: "Activo" | "Inactivo" | "Suspendido") => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success(`Estado del usuario actualizado a: ${newStatus}`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>;
      case "Inactivo":
        return <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>;
      case "Suspendido":
        return <Badge className="bg-red-100 text-red-800">Suspendido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      case "Premium":
        return <Badge className="bg-indigo-100 text-indigo-800">Premium</Badge>;
      case "Free":
        return <Badge className="bg-blue-100 text-blue-800">Free</Badge>;
      default:
        return <Badge>{plan}</Badge>;
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "Activo").length,
    inactive: users.filter(u => u.status === "Inactivo").length,
    suspended: users.filter(u => u.status === "Suspendido").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Gestión de Usuarios</h1>
        <p className="text-gray-600">Administra y monitorea usuarios de la plataforma</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600">{stats.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Suspendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-600">{stats.suspended}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar por nombre, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-gray-600">Usuario</th>
                  <th className="text-left p-3 text-sm text-gray-600">Plan</th>
                  <th className="text-left p-3 text-sm text-gray-600">Estado</th>
                  <th className="text-left p-3 text-sm text-gray-600">Balance</th>
                  <th className="text-left p-3 text-sm text-gray-600">Transacciones</th>
                  <th className="text-left p-3 text-sm text-gray-600">Última Actividad</th>
                  <th className="text-left p-3 text-sm text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {getPlanBadge(user.plan)}
                    </td>
                    <td className="p-3">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign size={14} className="text-green-600" />
                        <span>{user.balance.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <TrendingUp size={14} />
                        <span>{user.totalTransactions}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-gray-600">{user.lastActivity}</span>
                    </td>
                    <td className="p-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                          >
                            Ver detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalles del Usuario</DialogTitle>
                            <DialogDescription>
                              ID: {user.id} - {user.email}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            {/* User Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <User className="text-gray-600" size={16} />
                                  <span className="text-sm text-gray-600">Nombre</span>
                                </div>
                                <p className="text-gray-900">{user.name}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Mail className="text-gray-600" size={16} />
                                  <span className="text-sm text-gray-600">Email</span>
                                </div>
                                <p className="text-gray-900">{user.email}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Calendar className="text-gray-600" size={16} />
                                  <span className="text-sm text-gray-600">Fecha de Registro</span>
                                </div>
                                <p className="text-gray-900">
                                  {new Date(user.joinDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <DollarSign className="text-gray-600" size={16} />
                                  <span className="text-sm text-gray-600">Balance</span>
                                </div>
                                <p className="text-gray-900">${user.balance.toFixed(2)}</p>
                              </div>
                            </div>

                            {/* Status & Plan */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Estado</span>
                                <div className="mt-2">
                                  {getStatusBadge(user.status)}
                                </div>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Plan</span>
                                <div className="mt-2">
                                  {getPlanBadge(user.plan)}
                                </div>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Estadísticas</span>
                              <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                  <p className="text-xs text-gray-600">Total Transacciones</p>
                                  <p className="text-gray-900">{user.totalTransactions}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Última Actividad</p>
                                  <p className="text-gray-900">{user.lastActivity}</p>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2 pt-4 border-t">
                              <p className="text-sm text-gray-600">Acciones</p>
                              <div className="flex gap-2">
                                {user.status !== "Activo" && (
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    onClick={() => handleStatusChange(user.id, "Activo")}
                                  >
                                    <Check size={16} className="mr-2" />
                                    Activar Usuario
                                  </Button>
                                )}
                                {user.status !== "Suspendido" && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => handleStatusChange(user.id, "Suspendido")}
                                  >
                                    <Ban size={16} className="mr-2" />
                                    Suspender Usuario
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <User className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600">No se encontraron usuarios</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
