import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Target, Plus, Calendar, TrendingUp, ArrowUpCircle, ArrowDownCircle, Trash2, PartyPopper } from "lucide-react";
import { toast } from "sonner";

const initialGoals = [
  { id: 1, name: "Vacaciones 2026", target: 5000, current: 2500, deadline: "2026-06-01", priority: "Alta" },
  { id: 2, name: "Fondo de Emergencia", target: 10000, current: 7500, deadline: "2025-12-31", priority: "Alta" },
  { id: 3, name: "Laptop nueva", target: 1500, current: 800, deadline: "2026-03-01", priority: "Media" },
];

export function SavingsGoals() {
  const [goals, setGoals] = useState(initialGoals);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionDialog, setTransactionDialog] = useState<{ open: boolean; goalId: number | null; type: 'deposit' | 'withdraw' | null }>({
    open: false,
    goalId: null,
    type: null,
  });
  const [transactionAmount, setTransactionAmount] = useState("");
  const [celebrationDialog, setCelebrationDialog] = useState<{ open: boolean; goalName: string }>({
    open: false,
    goalName: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    deadline: "",
    priority: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      name: formData.name,
      target: parseFloat(formData.target),
      current: 0,
      deadline: formData.deadline,
      priority: formData.priority,
    };
    setGoals([...goals, newGoal]);
    setFormData({ name: "", target: "", deadline: "", priority: "" });
    setIsOpen(false);
    toast.success("Meta de ahorro creada");
  };

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionDialog.goalId || !transactionDialog.type) return;
    
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Ingrese un monto válido");
      return;
    }

    let goalCompleted = false;
    let completedGoalName = "";

    setGoals(goals.map(goal => {
      if (goal.id === transactionDialog.goalId) {
        let newCurrent = goal.current;
        const wasCompleted = goal.current >= goal.target;
        
        if (transactionDialog.type === 'deposit') {
          newCurrent = Math.min(goal.current + amount, goal.target);
          const actualDeposit = newCurrent - goal.current;
          toast.success(`Se agregaron $${actualDeposit.toFixed(2)} a "${goal.name}"`);
          
          // Verificar si se completó la meta
          if (!wasCompleted && newCurrent >= goal.target) {
            goalCompleted = true;
            completedGoalName = goal.name;
          }
        } else {
          newCurrent = Math.max(goal.current - amount, 0);
          const actualWithdrawal = goal.current - newCurrent;
          toast.success(`Se retiraron $${actualWithdrawal.toFixed(2)} de "${goal.name}"`);
        }
        
        return { ...goal, current: newCurrent };
      }
      return goal;
    }));

    setTransactionAmount("");
    setTransactionDialog({ open: false, goalId: null, type: null });

    // Mostrar diálogo de celebración si se completó una meta
    if (goalCompleted) {
      setTimeout(() => {
        setCelebrationDialog({ open: true, goalName: completedGoalName });
      }, 300);
    }
  };

  const openTransactionDialog = (goalId: number, type: 'deposit' | 'withdraw') => {
    setTransactionDialog({ open: true, goalId, type });
    setTransactionAmount("");
  };

  const handleDeleteGoal = (goalId: number, goalName: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
    toast.success(`Meta "${goalName}" eliminada`);
  };

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "text-red-600 bg-red-100";
      case "Media": return "text-yellow-600 bg-yellow-100";
      case "Baja": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const selectedGoal = goals.find(g => g.id === transactionDialog.goalId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Metas de Ahorro</h1>
          <p className="text-gray-600">Define y alcanza tus objetivos financieros</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus size={20} className="mr-2" />
              Nueva Meta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Meta de Ahorro</DialogTitle>
              <DialogDescription>
                Define tu objetivo de ahorro y establece un plazo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la meta</Label>
                <Input
                  id="name"
                  placeholder="Ej: Vacaciones, Auto nuevo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Monto objetivo</Label>
                <Input
                  id="target"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Fecha límite</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Crear Meta
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog para transacciones (ingresar/retirar) */}
      <Dialog open={transactionDialog.open} onOpenChange={(open) => !open && setTransactionDialog({ open: false, goalId: null, type: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {transactionDialog.type === 'deposit' ? 'Ingresar Dinero' : 'Retirar Dinero'}
            </DialogTitle>
            <DialogDescription>
              {selectedGoal && (
                <>
                  Meta: {selectedGoal.name} (Disponible: ${selectedGoal.current.toFixed(2)})
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTransaction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                Monto a {transactionDialog.type === 'deposit' ? 'ingresar' : 'retirar'}
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                required
                autoFocus
              />
            </div>

            {selectedGoal && transactionDialog.type === 'deposit' && (
              <p className="text-sm text-gray-600">
                Falta para completar: ${(selectedGoal.target - selectedGoal.current).toFixed(2)}
              </p>
            )}

            {selectedGoal && transactionDialog.type === 'withdraw' && parseFloat(transactionAmount) > selectedGoal.current && (
              <p className="text-sm text-red-600">
                El monto a retirar no puede ser mayor al disponible
              </p>
            )}

            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setTransactionDialog({ open: false, goalId: null, type: null })}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className={`flex-1 ${
                  transactionDialog.type === 'deposit' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {transactionDialog.type === 'deposit' ? 'Ingresar' : 'Retirar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para celebración */}
      <Dialog open={celebrationDialog.open} onOpenChange={(open) => !open && setCelebrationDialog({ open: false, goalName: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Felicidades!</DialogTitle>
            <DialogDescription>
              ¡Has completado la meta de ahorro "{celebrationDialog.goalName}"!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <PartyPopper size={64} className="text-green-600" />
          </div>
          <Button 
            type="button" 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setCelebrationDialog({ open: false, goalName: "" })}
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          const daysRemaining = getDaysRemaining(goal.deadline);
          
          return (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="text-indigo-600" size={20} />
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                      onClick={() => handleDeleteGoal(goal.id, goal.name)}
                      title="Eliminar meta"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progreso</span>
                    <span className="text-sm text-indigo-600">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-600">Actual</p>
                    <p className="text-green-600">${goal.current.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="text-gray-400" size={16} />
                  <div className="text-right">
                    <p className="text-gray-600">Objetivo</p>
                    <p className="text-indigo-600">${goal.target.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t">
                  <Calendar size={16} />
                  <span>
                    {daysRemaining > 0 
                      ? `${daysRemaining} días restantes`
                      : "Plazo vencido"
                    }
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600 mb-3">Falta: ${(goal.target - goal.current).toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => openTransactionDialog(goal.id, 'deposit')}
                    >
                      <ArrowUpCircle size={16} className="mr-1" />
                      Ingresar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => openTransactionDialog(goal.id, 'withdraw')}
                      disabled={goal.current === 0}
                    >
                      <ArrowDownCircle size={16} className="mr-1" />
                      Retirar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}