import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Clock, Calendar, User, CheckCircle, AlertCircle, Phone } from "lucide-react"

const mockTasks = [
  {
    id: 1,
    title: "Ligar TechCorp Solutions - Seguir com proposta",
    description: "Discutir preço e implementação",
    priority: "Alta",
    status: "pendente",
    dueDate: "2024-01-16",
    assignee: "Você",
    company: "TechCorp Solutions",
    type: "call",
    completed: false
  },
  {
    id: 2,
    title: "Mnadar proposta para Digital Dynamics",
    description: "Porposta tecnica para upgrade de plataforma",
    priority: "Alta",
    status: "pending",
    dueDate: "2024-01-17",
    assignee: "Sarah Wilson",
    company: "Digital Dynamics",
    type: "email",
    completed: false
  },
  {
    id: 3,
    title: "Marcar demo com Innovation Labs",
    description: "Demonstração de produto para integração em projeto",
    priority: "medio",
    status: "in-progress",
    dueDate: "2024-01-18",
    assignee: "Mike Johnson",
    company: "Innovation Labs",
    type: "meeting",
    completed: false
  },
  {
    id: 4,
    title: "Seguir com Future Systems",
    description: "Verificar comercial",
    priority: "baixa",
    status: "pending",
    dueDate: "2024-01-19",
    assignee: "Você",
    company: "Future Systems",
    type: "email",
    completed: false
  },
  {
    id: 5,
    title: "Contratar review com Smart Solutions",
    priority: "baixa",
    status: "completa",
    dueDate: "2024-01-15",
    assignee: "Legal Team",
    company: "Smart Solutions",
    type: "task",
    completed: true
  },
]

const priorityColors = {
  alta: "bg-destructive text-destructive-foreground",
  medio: "bg-warning text-warning-foreground",
  baixa: "bg-success text-success-foreground"
}

const statusColors = {
  pending: "bg-secondary text-secondary-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  completed: "bg-success text-success-foreground"
}

export default function Tasks() {
  const pendingTasks = mockTasks.filter(task => !task.completed)
  const completedTasks = mockTasks.filter(task => task.completed)
  const overdueTasks = mockTasks.filter(task => !task.completed && new Date(task.dueDate) < new Date())
  const todayTasks = mockTasks.filter(task => task.dueDate === "2024-01-16")

  const getIcon = (type: string) => {
    if (type === "call") return Clock
    if (type === "email") return AlertCircle
    if (type === "meeting") return Calendar
    return CheckCircle
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate !== "2024-01-16"
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date("2024-01-16")
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
    return `${diffDays} days`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <p className="text-muted-foreground">Gerencia suas atividades</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{pendingTasks.length}</div>
            <div className="text-sm text-muted-foreground">Tarefas pendentes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{completedTasks.length}</div>
            <div className="text-sm text-muted-foreground">Completas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{overdueTasks.length}</div>
            <div className="text-sm text-muted-foreground">Atrasadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{todayTasks.length}</div>
            <div className="text-sm text-muted-foreground">Hoje</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Tasks ({pendingTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => {
              const IconComponent = getIcon(task.type)
              return (
                <div key={task.id} className={`p-4 border rounded-lg ${isOverdue(task.dueDate) ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
                  <div className="flex items-start gap-3">
                    <Checkbox className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium leading-tight">{task.title}</h4>
                        <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <IconComponent className="h-3 w-3" />
                            <span className="capitalize">{task.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                        <div className={`text-xs ${isOverdue(task.dueDate) ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                          {getDaysUntilDue(task.dueDate)}
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {task.company}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedTasks.map((task) => {
              const IconComponent = getIcon(task.type)
              return (
                <div key={task.id} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-start gap-3">
                    <Checkbox checked className="mt-1" />
                    <div className="flex-1 space-y-2 opacity-70">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium leading-tight line-through">{task.title}</h4>
                        <Badge className={statusColors.completed}>
                          completed
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <IconComponent className="h-3 w-3" />
                            <span className="capitalize">{task.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Completed
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {task.company}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}