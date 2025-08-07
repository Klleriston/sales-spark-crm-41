import { useState } from "react"
import { Card, CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Phone, Mail, MapPin, Building2 } from "lucide-react"

const mockContacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    position: "VP of Sales",
    location: "New York, NY",
    tags: ["Tomador de decisão", "Lider"],
    lastContact: "2024-01-15",
    dealValue: 45000
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.w@digitaldynamics.com",
    phone: "+1 (555) 987-6543",
    company: "Digital Dynamics",
    position: "CTO",
    location: "San Francisco, CA",
    tags: ["Tecnico", "Inovação"],
    lastContact: "2024-01-14",
    dealValue: 32500
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "m.johnson@innovationlabs.com",
    phone: "+1 (555) 456-7890",
    company: "Innovation Labs",
    position: "CEO",
    location: "Austin, TX",
    tags: [ "Lider"],
    lastContact: "2024-01-13",
    dealValue: 78000
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@futuresystems.com",
    phone: "+1 (555) 321-9876",
    company: "Future Systems",
    position: "Director of Operations",
    location: "Seattle, WA",
    tags: ["Influencer"],
    lastContact: "2024-01-12",
    dealValue: 23000
  }
]

const tagColors = {
  "Decision Maker": "bg-primary text-primary-foreground",
  "Hot Lead": "bg-destructive text-destructive-foreground",
  "Warm Lead": "bg-warning text-warning-foreground",
  "Technical": "bg-blue-100 text-blue-800",
  "Evaluator": "bg-purple-100 text-purple-800",
  "Influencer": "bg-orange-100 text-orange-800",
  "Champion": "bg-green-100 text-green-800",
  "Closed Won": "bg-success text-success-foreground",
  "High Value": "bg-indigo-100 text-indigo-800"
}

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCompany = companyFilter === "all" || contact.company === companyFilter
    const matchesTag = tagFilter === "all" || contact.tags.includes(tagFilter)
    
    return matchesSearch && matchesCompany && matchesTag
  })

  const companies = Array.from(new Set(mockContacts.map(c => c.company)))
  const allTags = Array.from(new Set(mockContacts.flatMap(c => c.tags)))

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contatos</h1>
          </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{mockContacts.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{companies.length}</div>
            <div className="text-sm text-muted-foreground">Empresas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {mockContacts.filter(c => c.tags.includes("Hot Lead")).length}
            </div>
            <div className="text-sm text-muted-foreground">Leads</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contatos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(contact.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.position}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Building2 className="h-3 w-3" />
                    {contact.company}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {contact.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    className={tagColors[tag as keyof typeof tagColors] || "bg-secondary text-secondary-foreground"}
                    variant="secondary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}