import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, DollarSign, Calendar, User, Building2 } from "lucide-react"

// Mock deals data organized by pipeline stage
const pipelineStages = [
  { id: "prospecting", name: "Prospecting", color: "bg-gray-100" },
  { id: "qualified", name: "Qualified", color: "bg-blue-100" },
  { id: "proposal", name: "Proposal", color: "bg-yellow-100" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100" },
  { id: "closed-won", name: "Closed Won", color: "bg-green-100" },
  { id: "closed-lost", name: "Closed Lost", color: "bg-red-100" }
]

const mockDeals = [
  {
    id: 1,
    title: "TechCorp Enterprise License",
    company: "TechCorp Solutions",
    contact: "John Smith",
    value: 45000,
    stage: "negotiation",
    probability: 85,
    closeDate: "2024-02-15",
    createdAt: "2024-01-10"
  },
  {
    id: 2,
    title: "Digital Platform Upgrade",
    company: "Digital Dynamics",
    contact: "Sarah Wilson",
    value: 32500,
    stage: "proposal",
    probability: 60,
    closeDate: "2024-02-28",
    createdAt: "2024-01-12"
  },
  {
    id: 3,
    title: "Innovation Labs Integration",
    company: "Innovation Labs",
    contact: "Mike Johnson",
    value: 78000,
    stage: "qualified",
    probability: 45,
    closeDate: "2024-03-15",
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    title: "Future Systems Consultation",
    company: "Future Systems",
    contact: "Lisa Chen",
    value: 23000,
    stage: "prospecting",
    probability: 25,
    closeDate: "2024-03-30",
    createdAt: "2024-01-15"
  },
  {
    id: 5,
    title: "Smart Solutions Package",
    company: "Smart Solutions",
    contact: "David Lee",
    value: 56000,
    stage: "closed-won",
    probability: 100,
    closeDate: "2024-01-20",
    createdAt: "2023-12-15"
  },
  {
    id: 6,
    title: "Global Corp Implementation",
    company: "Global Corp",
    contact: "Emma Davis",
    value: 67000,
    stage: "negotiation",
    probability: 90,
    closeDate: "2024-02-10",
    createdAt: "2024-01-05"
  }
]

export default function Deals() {
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline")
  
  const totalValue = mockDeals.reduce((sum, deal) => sum + deal.value, 0)
  const weightedValue = mockDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)

  const getDealsByStage = (stageId: string) => {
    return mockDeals.filter(deal => deal.stage === stageId)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your deals through the sales process</p>
        </div>
        <div className="flex gap-3">
          <Select value={viewMode} onValueChange={(value: "pipeline" | "list") => setViewMode(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pipeline">Pipeline View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalValue)}</div>
            <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{formatCurrency(weightedValue)}</div>
            <div className="text-sm text-muted-foreground">Weighted Pipeline</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockDeals.length}</div>
            <div className="text-sm text-muted-foreground">Active Deals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{formatCurrency(mockDeals.reduce((sum, deal) => sum + deal.value, 0) / mockDeals.length)}</div>
            <div className="text-sm text-muted-foreground">Avg Deal Size</div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline View */}
      {viewMode === "pipeline" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {pipelineStages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id)
            const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)
            
            return (
              <Card key={stage.id} className={`${stage.color} border-l-4 border-l-primary`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    {stage.name}
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {stageDeals.length} deals • {formatCurrency(stageValue)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stageDeals.map((deal) => (
                    <Card key={deal.id} className="bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            {deal.company}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            {deal.contact}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {deal.closeDate}
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-primary">
                                {formatCurrency(deal.value)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {deal.probability}%
                              </span>
                            </div>
                            <Progress value={deal.probability} className="h-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>All Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{deal.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {deal.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {deal.contact}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {deal.closeDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(deal.value)}</div>
                      <div className="text-sm text-muted-foreground">{deal.probability}% probability</div>
                    </div>
                    <Badge variant="outline">
                      {pipelineStages.find(s => s.id === deal.stage)?.name}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}