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

// Mock data
const metrics = [
  {
    title: "Total Revenue",
    value: "$2,847,293",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign
  },
  {
    title: "Active Deals",
    value: "142",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Target
  },
  {
    title: "New Leads",
    value: "68",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Users
  },
  {
    title: "Conversion Rate",
    value: "24.8%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: TrendingUp
  }
]

const recentDeals = [
  { id: 1, company: "TechCorp Solutions", value: "$45,000", stage: "Negotiation", probability: 85 },
  { id: 2, company: "Digital Dynamics", value: "$32,500", stage: "Proposal", probability: 60 },
  { id: 3, company: "Innovation Labs", value: "$78,000", stage: "Qualified", probability: 45 },
  { id: 4, company: "Future Systems", value: "$23,000", stage: "Discovery", probability: 25 },
  { id: 5, company: "Smart Solutions", value: "$56,000", stage: "Closed Won", probability: 100 }
]

const recentActivities = [
  { id: 1, type: "call", description: "Called John Smith at TechCorp", time: "2 hours ago" },
  { id: 2, type: "email", description: "Sent proposal to Digital Dynamics", time: "4 hours ago" },
  { id: 3, type: "meeting", description: "Demo scheduled with Innovation Labs", time: "1 day ago" },
  { id: 4, type: "task", description: "Follow up with Future Systems", time: "2 days ago" }
]

const upcomingTasks = [
  { id: 1, title: "Call TechCorp Solutions", due: "Today 2:00 PM", priority: "high" },
  { id: 2, title: "Send proposal to ABC Corp", due: "Tomorrow 10:00 AM", priority: "medium" },
  { id: 3, title: "Demo for Innovation Labs", due: "Dec 15 3:00 PM", priority: "high" },
  { id: 4, title: "Follow up email", due: "Dec 16 9:00 AM", priority: "low" }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sales Dashboard</h1>
        <p className="text-muted-foreground">Track your sales performance and pipeline</p>
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
              Pipeline Overview
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
                      <span>Probability: {deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-2" />
                  </div>
                </div>
                <Badge 
                  variant={deal.stage === "Closed Won" ? "default" : "secondary"}
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
                Upcoming Tasks
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
                      task.priority === "high" ? "destructive" : 
                      task.priority === "medium" ? "default" : "secondary"
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
                Recent Activities
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