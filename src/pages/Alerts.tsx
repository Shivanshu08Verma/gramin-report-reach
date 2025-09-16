import { Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "resolved",
    title: "Issue Resolved",
    message: "Your pothole report on Elm Street has been fixed by the Municipal Department",
    date: "Oct 15, 2024",
    time: "2:30 PM",
    icon: CheckCircle,
    color: "text-success"
  },
  {
    id: 2,
    type: "progress",
    title: "Issue In Progress",
    message: "Your streetlight report is being worked on by the Electrical Department",
    date: "Oct 14, 2024", 
    time: "10:15 AM",
    icon: Clock,
    color: "text-primary"
  },
  {
    id: 3,
    type: "acknowledged",
    title: "Issue Acknowledged",
    message: "Your sidewalk damage report has been acknowledged and redirected to the Public Works Department",
    date: "Oct 12, 2024",
    time: "4:45 PM", 
    icon: AlertTriangle,
    color: "text-warning"
  },
  {
    id: 4,
    type: "submitted",
    title: "Report Submitted",
    message: "Your garbage collection issue has been successfully submitted",
    date: "Oct 10, 2024",
    time: "9:20 AM",
    icon: Bell,
    color: "text-muted-foreground"
  },
  {
    id: 5,
    type: "feedback",
    title: "Feedback Request",
    message: "Please rate the resolution of your pothole report on Main Street",
    date: "Oct 8, 2024",
    time: "1:15 PM",
    icon: Bell,
    color: "text-primary"
  }
];

export const Alerts = () => {
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
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {notifications.length} New
          </Badge>
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