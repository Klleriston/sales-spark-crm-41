import { MetricCard } from "@/components/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react"

// Dados simulados
const metrics = [
  {
    title: "Receita Total",
    value: "R$ 2.847.293",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign
  },
  {
    title: "Negócios Ativos",
    value: "142",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Target
  },
  {
    title: "Novos Leads",
    value: "68",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Users
  },
  {
    title: "Taxa de Conversão",
    value: "24.8%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: TrendingUp
  }
]

const recentDeals = [
  { id: 1, company: "TechCorp Soluções", value: "R$ 45.000", stage: "Negociação", probability: 85 },
  { id: 2, company: "Digital Dynamics", value: "R$ 32.500", stage: "Proposta", probability: 60 },
  { id: 3, company: "Laboratórios Inovação", value: "R$ 78.000", stage: "Qualificado", probability: 45 },
  { id: 4, company: "Sistemas Futuros", value: "R$ 23.000", stage: "Descoberta", probability: 25 },
  { id: 5, company: "Soluções Inteligentes", value: "R$ 56.000", stage: "Fechado", probability: 100 }
]

const recentActivities = [
  { id: 1, type: "call", description: "Ligou para João Silva na TechCorp", time: "2 horas atrás" },
  { id: 2, type: "email", description: "Enviou proposta para Digital Dynamics", time: "4 horas atrás" },
  { id: 3, type: "meeting", description: "Demo agendada com Laboratórios Inovação", time: "1 dia atrás" },
  { id: 4, type: "task", description: "Acompanhar Sistemas Futuros", time: "2 dias atrás" }
]

const upcomingTasks = [
  { id: 1, title: "Ligar TechCorp Soluções", due: "Hoje 14:00", priority: "alta" },
  { id: 2, title: "Enviar proposta ABC Corp", due: "Amanhã 10:00", priority: "média" },
  { id: 3, title: "Demo Laboratórios Inovação", due: "15 Dez 15:00", priority: "alta" },
  { id: 4, title: "Email de acompanhamento", due: "16 Dez 09:00", priority: "baixa" }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Painel de Vendas</h1>
        <p className="text-muted-foreground">Acompanhe seu desempenho de vendas e pipeline</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Visão Geral do Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{deal.company}</div>
                  <div className="text-sm text-muted-foreground">{deal.value}</div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Probabilidade: {deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-2" />
                  </div>
                </div>
                <Badge 
                  variant={deal.stage === "Fechado" ? "default" : "secondary"}
                  className="ml-3"
                >
                  {deal.stage}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities & Tasks */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Próximas Tarefas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.due}
                    </div>
                  </div>
                  <Badge 
                    variant={
                      task.priority === "alta" ? "destructive" : 
                      task.priority === "média" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm">{activity.description}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}