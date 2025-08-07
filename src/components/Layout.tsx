import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/notifications')
  }
  
  const handleUserClick = () => {
    navigate('/profile')
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleNotificationClick} >
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleUserClick}>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}