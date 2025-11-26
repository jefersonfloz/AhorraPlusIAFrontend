import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileBarChart, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { id: "admin-users", label: "Usuarios", icon: Users, path: "/admin/users" },
    { id: "admin-support", label: "Soporte", icon: MessageSquare, path: "/admin/support" },
    { id: "admin-analytics", label: "Analíticas", icon: FileBarChart, path: "/admin/analytics" },
    { id: "admin-settings", label: "Configuración", icon: Settings, path: "/admin/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-indigo-600">Admin Panel</h2>
        <p className="text-sm text-gray-600 mt-1">Gestión y monitoreo</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={() => {
            onLogout();
            setIsOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-40 px-4 py-3 flex items-center justify-between">
        <h2 className="text-indigo-600">Admin Panel</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
