import { Bell, CheckCircle, Clock, AlertTriangle, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "resolved",
    title: "Issue Resolved - Feedback Required",
    message: "Your pothole report on Elm Street has been resolved by the Municipal Corporation on Oct 15, 2024. Please provide your feedback on the resolution quality.",
    date: "Oct 15, 2024",
    time: "2:30 PM",
    icon: CheckCircle,
    color: "text-success",
    department: "Municipal Corporation"
  },
  {
    id: 2,
    type: "progress",
    title: "Issue In Progress",
    message: "Your streetlight repair report on Main Avenue is currently being worked on by the Electrical Department. Expected completion: Oct 18, 2024.",
    date: "Oct 14, 2024", 
    time: "10:15 AM",
    icon: Clock,
    color: "text-primary",
    department: "Electrical Department"
  },
  {
    id: 3,
    type: "acknowledged",
    title: "Issue Acknowledged & Redirected",
    message: "Your sidewalk damage report on Park Road has been acknowledged and redirected to the Public Works Department on Oct 12, 2024 at 4:45 PM.",
    date: "Oct 12, 2024",
    time: "4:45 PM", 
    icon: AlertTriangle,
    color: "text-warning",
    department: "Public Works Department"
  },
  {
    id: 4,
    type: "submitted",
    title: "Report Successfully Submitted",
    message: "Your garbage collection issue report has been successfully submitted on Oct 10, 2024 at 9:20 AM. Reference ID: #GC2024-1234",
    date: "Oct 10, 2024",
    time: "9:20 AM",
    icon: Bell,
    color: "text-muted-foreground",
    department: "Waste Management"
  },
  {
    id: 5,
    type: "feedback",
    title: "Feedback Request",
    message: "Please rate the resolution of your pothole report on Main Street that was completed on Oct 5, 2024. Your feedback helps us improve our services.",
    date: "Oct 8, 2024",
    time: "1:15 PM",
    icon: Bell,
    color: "text-primary",
    department: "Municipal Corporation"
  }
];

export const Alerts = () => {
  const navigate = useNavigate();
  const getNotificationBg = (type: string) => {
    switch (type) {
      case "resolved": return "bg-success/10 border-success/20";
      case "progress": return "bg-primary/10 border-primary/20";
      case "acknowledged": return "bg-warning/10 border-warning/20";
      default: return "bg-muted/50 border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Notifications</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {notifications.length} New
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

      <div className="p-4">
        <p className="text-muted-foreground text-sm mb-4">Latest notifications at the top</p>
        
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card key={notification.id} className={`p-4 ${getNotificationBg(notification.type)} card-shadow hover:elevated-shadow transition-all cursor-pointer`}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <IconComponent className={`w-5 h-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm">{notification.title}</h3>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>{notification.date}</div>
                        <div>{notification.time}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notification.message}
                    </p>
                    {notification.department && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {notification.department}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Language Support Notice */}
        <Card className="mt-6 p-4 bg-primary/5 border-primary/20">
          <div className="text-center space-y-2">
            <h3 className="font-medium text-primary">🌐 Multi-Language Support</h3>
            <p className="text-sm text-muted-foreground">
              Notifications available in Hindi, Bengali, Tamil, Telugu, Marathi, and other Indian languages
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;