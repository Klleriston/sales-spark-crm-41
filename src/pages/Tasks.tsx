import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Clock, Calendar, User, CheckCircle, AlertCircle, Phone } from "lucide-react"

const mockTasks = [
  {
    id: 1,
    title: "Call TechCorp Solutions - Follow up on proposal",
    description: "Discuss pricing and implementation timeline",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-16",
    assignee: "You",
    company: "TechCorp Solutions",
    type: "call",
    completed: false
  },
  {
    id: 2,
    title: "Send proposal to Digital Dynamics",
    description: "Technical proposal for platform upgrade",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-17",
    assignee: "Sarah Wilson",
    company: "Digital Dynamics",
    type: "email",
    completed: false
  },
  {
    id: 3,
    title: "Schedule demo with Innovation Labs",
    description: "Product demonstration for integration project",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-01-18",
    assignee: "Mike Johnson",
    company: "Innovation Labs",
    type: "meeting",
    completed: false
  },
  {
    id: 4,
    title: "Follow up with Future Systems",
    description: "Check on decision timeline",
    priority: "medium",
    status: "pending",
    dueDate: "2024-01-19",
    assignee: "You",
    company: "Future Systems",
    type: "email",
    completed: false
  },
  {
    id: 5,
    title: "Contract review with Smart Solutions",
    description: "Legal review of service agreement",
    priority: "low",
    status: "completed",
    dueDate: "2024-01-15",
    assignee: "Legal Team",
    company: "Smart Solutions",
    type: "task",
    completed: true
  },
  {
    id: 6,
    title: "Prepare quarterly business review",
    description: "QBR presentation for Global Corp",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-20",
    assignee: "You",
    company: "Global Corp",
    type: "task",
    completed: false
  }
]

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground"
}

const statusColors = {
  pending: "bg-secondary text-secondary-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  completed: "bg-success text-success-foreground"
}

const typeIcons = {
  call: Phone,
  email: "@",
  meeting: Calendar,
  task: CheckCircle
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
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your activities and follow-ups</p>
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
            <div className="text-sm text-muted-foreground">Pending Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{completedTasks.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{overdueTasks.length}</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{todayTasks.length}</div>
            <div className="text-sm text-muted-foreground">Due Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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