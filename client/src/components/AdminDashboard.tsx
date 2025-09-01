import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Projector, DollarSign, TrendingUp, User, Briefcase, Shield } from "lucide-react";
import type { AdminStats, Activity } from "@shared/schema";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/admin/activities"],
  });

  if (statsLoading || activitiesLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 neon-orange">Dashboard Overview</h1>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "USER":
        return <User className="neon-blue h-4 w-4" />;
      case "PROJECT":
        return <Briefcase className="neon-pink h-4 w-4" />;
      case "SECURITY":
        return <Shield className="neon-orange h-4 w-4" />;
      default:
        return <User className="neon-blue h-4 w-4" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "USER":
        return "bg-primary text-primary-foreground";
      case "PROJECT":
        return "bg-chart-2 text-white";
      case "SECURITY":
        return "bg-chart-4 text-white";
      case "CONTACT":
        return "bg-chart-3 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 neon-orange">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card neon-border-orange">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold neon-orange" data-testid="stat-total-users">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <Users className="neon-orange h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border-pink">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold neon-pink" data-testid="stat-active-projects">
                  {stats?.activeProjects || 0}
                </p>
              </div>
              <Projector className="neon-pink h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border-blue">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold neon-blue" data-testid="stat-revenue">
                  {stats?.revenue || "$0"}
                </p>
              </div>
              <DollarSign className="neon-blue h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border-orange">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-2xl font-bold neon-orange" data-testid="stat-growth">
                  {stats?.growth || "0%"}
                </p>
              </div>
              <TrendingUp className="neon-orange h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="neon-pink">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities?.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-4 bg-accent rounded-lg"
                data-testid={`activity-${activity.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 neon-border-blue rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getActivityBadgeColor(activity.type)}`}>
                  {activity.type}
                </span>
              </div>
            )) || (
              <p className="text-muted-foreground text-center py-8">No recent activities</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
