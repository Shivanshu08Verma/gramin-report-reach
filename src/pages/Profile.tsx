import { Edit2, MapPin, Mail, Phone, User, LogOut, Bug, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  joinDate: "January 2024",
  totalIssues: 15,
  resolvedIssues: 8,
  totalPoints: 250,
  badges: ["Community Hero", "Quick Reporter", "Problem Solver"]
};

export const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 text-center civic-gradient text-primary-foreground">
          <div className="space-y-4">
            <Avatar className="w-20 h-20 mx-auto border-2 border-primary-foreground/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary-foreground text-primary text-xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="opacity-90">Member since {userData.joinDate}</p>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userData.totalIssues}</div>
            <div className="text-sm text-muted-foreground">Total Issues</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{userData.resolvedIssues}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </Card>
        </div>

        {/* Points & Redeem Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-2">
            <div className="text-lg font-bold text-points">{userData.totalPoints}</div>
            <span className="text-sm">Points</span>
          </Button>
          <Button className="h-16 flex-col gap-2 civic-gradient">
            <span className="text-lg font-bold">Redeem</span>
            <span className="text-sm opacity-90">Rewards</span>
          </Button>
        </div>

        {/* Profile Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Profile Details</h3>
          <div className="space-y-4">
            {[
              { icon: User, label: "Name", value: userData.name },
              { icon: Phone, label: "Phone", value: userData.phone },
              { icon: Mail, label: "Email", value: userData.email },
              { icon: MapPin, label: "Location", value: userData.location }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-sm text-muted-foreground">{value}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Your Badges</h3>
          <div className="flex flex-wrap gap-2">
            {userData.badges.map((badge) => (
              <Badge key={badge} className="bg-points text-points-foreground">
                🏆 {badge}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-3" size="lg">
            <Bug className="w-5 h-5" />
            Report Bug
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3 text-destructive border-destructive/20 hover:bg-destructive/5" size="lg">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>

        {/* Language Support */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-center space-y-2">
            <h3 className="font-medium text-primary">🌍 Language Support</h3>
            <p className="text-sm text-muted-foreground">
              App available in Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and English
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Change Language
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;