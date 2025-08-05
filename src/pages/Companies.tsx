import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Building2, Users, DollarSign, MapPin, Globe, Phone } from "lucide-react"

const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "201-500",
    location: "New York, NY",
    website: "www.techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "Active Customer",
    totalDeals: 3,
    dealValue: 125000,
    contacts: 4,
    lastActivity: "2024-01-15"
  },
  {
    id: 2,
    name: "Digital Dynamics",
    industry: "Software",
    size: "51-200",
    location: "San Francisco, CA",
    website: "www.digitaldynamics.com",
    phone: "+1 (555) 987-6543",
    status: "Prospect",
    totalDeals: 1,
    dealValue: 32500,
    contacts: 2,
    lastActivity: "2024-01-14"
  },
  {
    id: 3,
    name: "Innovation Labs",
    industry: "Research & Development",
    size: "11-50",
    location: "Austin, TX",
    website: "www.innovationlabs.com",
    phone: "+1 (555) 456-7890",
    status: "Qualified Lead",
    totalDeals: 1,
    dealValue: 78000,
    contacts: 3,
    lastActivity: "2024-01-13"
  },
  {
    id: 4,
    name: "Future Systems",
    industry: "IT Services",
    size: "101-200",
    location: "Seattle, WA",
    website: "www.futuresystems.com",
    phone: "+1 (555) 321-9876",
    status: "Lead",
    totalDeals: 1,
    dealValue: 23000,
    contacts: 1,
    lastActivity: "2024-01-12"
  },
  {
    id: 5,
    name: "Smart Solutions",
    industry: "Consulting",
    size: "501-1000",
    location: "Chicago, IL",
    website: "www.smartsolutions.com",
    phone: "+1 (555) 654-3210",
    status: "Customer",
    totalDeals: 2,
    dealValue: 89000,
    contacts: 5,
    lastActivity: "2024-01-10"
  },
  {
    id: 6,
    name: "Global Corp",
    industry: "Manufacturing",
    size: "1000+",
    location: "Boston, MA",
    website: "www.globalcorp.com",
    phone: "+1 (555) 789-0123",
    status: "Active Customer",
    totalDeals: 3,
    dealValue: 234000,
    contacts: 8,
    lastActivity: "2024-01-09"
  }
]

const statusColors = {
  "Active Customer": "bg-success text-success-foreground",
  "Customer": "bg-success text-success-foreground",
  "Prospect": "bg-warning text-warning-foreground",
  "Qualified Lead": "bg-primary text-primary-foreground",
  "Lead": "bg-secondary text-secondary-foreground"
}

export default function Companies() {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const totalCompanies = mockCompanies.length
  const activeCustomers = mockCompanies.filter(c => c.status.includes("Customer")).length
  const totalValue = mockCompanies.reduce((sum, company) => sum + company.dealValue, 0)
  const avgDealSize = totalValue / mockCompanies.reduce((sum, company) => sum + company.totalDeals, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>
          <p className="text-muted-foreground">Manage your business accounts and organizations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{totalCompanies}</div>
            <div className="text-sm text-muted-foreground">Total Companies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{activeCustomers}</div>
            <div className="text-sm text-muted-foreground">Active Customers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{formatCurrency(avgDealSize)}</div>
            <div className="text-sm text-muted-foreground">Avg Deal Size</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(company.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                  <Badge 
                    className={statusColors[company.status as keyof typeof statusColors]}
                    variant="secondary"
                  >
                    {company.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{company.size} employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{company.contacts} contacts</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-primary hover:underline cursor-pointer">
                    {company.website}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">
                    {formatCurrency(company.dealValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{company.totalDeals}</div>
                  <div className="text-xs text-muted-foreground">Active Deals</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Last activity: {company.lastActivity}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}