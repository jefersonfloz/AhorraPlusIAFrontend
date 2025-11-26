import React from "react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart3, 
  Lightbulb, 
  HelpCircle, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "income", label: "Ingresos", icon: TrendingUp, path: "/income" },
    { id: "expenses", label: "Gastos", icon: TrendingDown, path: "/expenses" },
    { id: "goals", label: "Metas", icon: Target, path: "/goals" },
    { id: "reports", label: "Reportes", icon: BarChart3, path: "/reports" },
    { id: "recommendations", label: "Recomendaciones", icon: Lightbulb, path: "/recommendations" },
    { id: "support", label: "Soporte", icon: HelpCircle, path: "/support" },
    { id: "settings", label: "Configuración", icon: Settings, path: "/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-indigo-600">FinanceApp</h2>
        <p className="text-sm text-gray-600 mt-1">Gestión Personal</p>
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
      {/* Mobile Menu Button - Fixed at top */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-indigo-600">💰 FinanzasApp</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}
