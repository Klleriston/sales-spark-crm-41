import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Phone, Mail, Calendar } from "lucide-react"

const mockLeads = [
  {
    id: 1,
    name: "Jeferson Caua",
    company: "TechStart Inc",
    email: "j.caua@techstart.com",
    phone: "+55 (11) 912417266",
    source: "Website",
    status: "Novo",
    score: 85,
    lastContact: "2024-01-15",
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    name: "Laura Rodriguez",
    company: "Innovation Corp",
    email: "laura.r@innovation.com",
    phone: "+55 (12) 912351266",
    source: "LinkedIn",
    status: "Contactados",
    score: 78,
    lastContact: "2024-01-13",
    createdAt: "2024-01-12"
  },
  {
    id: 4,
    name: "Pedro Zynovisk",
    company: "Future Tech",
    email: "p.zynas@futuretech.com",
    phone: "+55 (11) 912032462",
    source: "Tiktok",
    status: "Qualificados",
    score: 65,
    lastContact: "2024-01-12",
    createdAt: "2024-01-05"
  }
]

const statusColors = {
  "Novo": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Contactados": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Qualificados": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Em Progresso": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Perdidos": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
}

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter
    
    return matchesSearch && matchesStatus && matchesSource
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Gerencia a prospeção de suas vendas</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl md:text-2xl font-bold text-primary">127</div>
                <div className="text-xs md:text-sm text-muted-foreground">Total de Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl md:text-2xl font-bold text-success">38</div>
                <div className="text-xs md:text-sm text-muted-foreground">Qualificados</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl md:text-2xl font-bold text-warning">24</div>
                <div className="text-xs md:text-sm text-muted-foreground">Em progresso</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl md:text-2xl font-bold">82%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Média</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, empresa ou email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Contratados">Contratados</SelectItem>
                  <SelectItem value="Qualificados">Qualificados</SelectItem>
                  <SelectItem value="Perdidos">Perdidos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por Origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Origens</SelectItem>
                  <SelectItem value="Website">Site</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Tiktok">Tiktok</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome/Empresa</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden sm:table-cell">Origem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Score</TableHead>
                  <TableHead className="hidden md:table-cell">Último contato</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="group">
                    <TableCell>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.company}</div>
                        {/* Informações extras em telas pequenas */}
                        <div className="md:hidden space-y-1 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{lead.lastContact}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate max-w-[200px]">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`whitespace-nowrap ${statusColors[lead.status as keyof typeof statusColors]}`}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium min-w-[2ch]">{lead.score}</div>
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                        <Calendar className="h-3 w-3" />
                        {lead.lastContact}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}