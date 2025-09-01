import { useLocation } from "wouter";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Admin() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground admin-panel">
      <div className="flex h-full">
        {/* Admin Sidebar */}
        <div className="w-64 bg-card border-r border-border p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-primary-green">Admin Panel</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLocation("/")}
              data-testid="button-back-home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <nav className="space-y-4">
            <a href="#dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors" data-testid="link-dashboard">
              <i className="fas fa-chart-bar text-accent-blue"></i>
              <span>Dashboard</span>
            </a>
            <a href="#settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors" data-testid="link-settings">
              <i className="fas fa-cog text-secondary-green"></i>
              <span>Settings</span>
            </a>
            <a href="#users" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors" data-testid="link-users">
              <i className="fas fa-users text-primary-green"></i>
              <span>Users</span>
            </a>
            <a href="#messages" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors" data-testid="link-messages">
              <i className="fas fa-envelope text-accent-blue"></i>
              <span>Messages</span>
            </a>
          </nav>
        </div>
        
        {/* Admin Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}
