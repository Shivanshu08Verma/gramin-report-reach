import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Target, Calendar } from "lucide-react";

interface PointsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const pointsHistory = [
  {
    id: 1,
    action: "Pothole Report Verified",
    points: 10,
    date: "Today, 2:30 PM",
    type: "report"
  },
  {
    id: 2,
    action: "Street Light Issue Resolved",
    points: 15,
    date: "Yesterday, 5:45 PM",
    type: "resolution"
  },
  {
    id: 3,
    action: "Daily Login Bonus",
    points: 5,
    date: "Yesterday, 9:00 AM",
    type: "bonus"
  },
  {
    id: 4,
    action: "Profile Completion",
    points: 20,
    date: "2 days ago",
    type: "achievement"
  },
  {
    id: 5,
    action: "First Report Submitted",
    points: 25,
    date: "3 days ago",
    type: "milestone"
  }
];

export const PointsDialog = ({ open, onOpenChange }: PointsDialogProps) => {
  const totalPoints = pointsHistory.reduce((sum, item) => sum + item.points, 0);

  const getIcon = (type: string) => {
    switch (type) {
      case "report": return <Target className="w-4 h-4" />;
      case "resolution": return <Trophy className="w-4 h-4" />;
      case "achievement": return <Star className="w-4 h-4" />;
      case "milestone": return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "report": return "text-primary";
      case "resolution": return "text-success";
      case "achievement": return "text-warning";
      case "milestone": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            My Points
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Points Display */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points Earned</div>
              <Badge variant="outline" className="border-primary text-primary">
                Active Member
              </Badge>
            </div>
          </Card>

          {/* Points History */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Points History
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pointsHistory.map((item) => (
                <Card key={item.id} className="p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${getIconColor(item.type)}`}>
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-foreground">
                          {item.action}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-success border-success bg-success/10"
                    >
                      +{item.points}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Points Info */}
          <Card className="p-4 bg-muted/30">
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="font-medium text-foreground mb-2">How to earn points:</div>
              <div>• Report issues: 10-15 points</div>
              <div>• Issue gets resolved: 15-25 points</div>
              <div>• Daily login: 5 points</div>
              <div>• Profile completion: 20 points</div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};