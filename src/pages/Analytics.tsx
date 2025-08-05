import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PieChart, TrendingUp, Users, Target, Calendar, Award } from "lucide-react"

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sales Analytics</h1>
        <p className="text-muted-foreground">Deep insights into your sales performance and team metrics</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Target</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-3" />
              <p className="text-xs text-muted-foreground">$284k of $334k target</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Quarterly Target</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="h-3" />
              <p className="text-xs text-muted-foreground">$728k of $1M target</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Sarah Wilson</span>
              <div className="flex items-center gap-2">
                <Progress value={92} className="w-20 h-2" />
                <Badge variant="default">Top</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mike Johnson</span>
              <div className="flex items-center gap-2">
                <Progress value={78} className="w-20 h-2" />
                <Badge variant="secondary">Good</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Lisa Chen</span>
              <div className="flex items-center gap-2">
                <Progress value={65} className="w-20 h-2" />
                <Badge variant="outline">Average</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Win Rate Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-success">73.2%</div>
              <p className="text-sm text-muted-foreground">Overall Win Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Q1 2024</span>
                <span>68.5%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Q4 2023</span>
                <span>71.2%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Q3 2023</span>
                <span>69.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lead Source Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Website</div>
                  <div className="text-sm text-muted-foreground">Conversion: 28.5%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">142 leads</div>
                  <div className="text-sm text-success">+12%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Referrals</div>
                  <div className="text-sm text-muted-foreground">Conversion: 45.2%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">86 leads</div>
                  <div className="text-sm text-success">+8%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">Conversion: 22.1%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">67 leads</div>
                  <div className="text-sm text-warning">-3%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Deal Size Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">$0 - $25k</span>
                <div className="flex items-center gap-2">
                  <Progress value={35} className="w-24 h-2" />
                  <span className="text-sm">35%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">$25k - $50k</span>
                <div className="flex items-center gap-2">
                  <Progress value={28} className="w-24 h-2" />
                  <span className="text-sm">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">$50k - $100k</span>
                <div className="flex items-center gap-2">
                  <Progress value={22} className="w-24 h-2" />
                  <span className="text-sm">22%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">$100k+</span>
                <div className="flex items-center gap-2">
                  <Progress value={15} className="w-24 h-2" />
                  <span className="text-sm">15%</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold">$47,500</div>
                <div className="text-sm text-muted-foreground">Average Deal Size</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Cycle & Forecasting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Sales Cycle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">42 days</div>
              <div className="text-sm text-muted-foreground">Average Cycle</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prospecting</span>
                <span>8 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Qualification</span>
                <span>12 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Proposal</span>
                <span>15 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Negotiation</span>
                <span>7 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>This Month</span>
                  <span className="font-medium">$284k</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Next Month</span>
                  <span className="font-medium">$312k</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quarter End</span>
                  <span className="font-medium">$1.2M</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sarah Wilson</div>
                  <div className="text-sm text-muted-foreground">$428k closed</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <div className="font-medium">Mike Johnson</div>
                  <div className="text-sm text-muted-foreground">$312k closed</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <div className="font-medium">Lisa Chen</div>
                  <div className="text-sm text-muted-foreground">$287k closed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}