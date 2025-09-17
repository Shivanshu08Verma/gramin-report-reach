import { Trophy, Star, Gift, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PointsDialog } from "@/components/PointsDialog";
import { RedeemDialog } from "@/components/RedeemDialog";

// Mock rewards data
const rewardsHistory = [
  {
    id: 1,
    points: 10,
    reason: "Pothole Report - Elm Street",
    date: "Oct 15, 2024",
    type: "pothole"
  },
  {
    id: 2,
    points: 15,
    reason: "Streetlight Issue - Main Avenue",
    date: "Oct 12, 2024", 
    type: "streetlight"
  },
  {
    id: 3,
    points: 8,
    reason: "Sidewalk Damage - Park Road",
    date: "Oct 10, 2024",
    type: "sidewalk"
  },
  {
    id: 4,
    points: 20,
    reason: "Quick Response Bonus",
    date: "Oct 8, 2024",
    type: "bonus"
  }
];

const availableRewards = [
  {
    id: 1,
    title: "Coffee Voucher",
    points: 100,
    description: "Free coffee at local cafes",
    available: true
  },
  {
    id: 2,
    title: "Movie Ticket",
    points: 300,
    description: "Free movie ticket at PVR",
    available: false
  },
  {
    id: 3,
    title: "Bus Pass",
    points: 500,
    description: "Free local bus pass for 1 week",
    available: false
  }
];

export const Rewards = () => {
  const totalPoints = rewardsHistory.reduce((sum, reward) => sum + reward.points, 0);
  const totalReports = rewardsHistory.length;
  const [showPoints, setShowPoints] = useState(false);
  const [redeemDialog, setRedeemDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Rewards</h1>
          <Trophy className="w-6 h-6 text-points" />
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Points Balance */}
        <Card className="p-6 civic-gradient text-primary-foreground text-center">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium opacity-90">Your Balance:</h2>
              <div className="text-4xl font-bold">{totalPoints} Points</div>
            </div>
            
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalPoints}</div>
                <div className="opacity-80">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalReports}</div>
                <div className="opacity-80">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5⭐</div>
                <div className="opacity-80">Badges</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-2"
            onClick={() => setShowPoints(true)}
          >
            <Star className="w-6 h-6 text-points" />
            <span>Points</span>
          </Button>
          <Button 
            variant="default" 
            className="h-16 flex-col gap-2 civic-gradient"
            onClick={() => setRedeemDialog(true)}
          >
            <Gift className="w-6 h-6" />
            <span>Redeem</span>
          </Button>
        </div>

        {/* Available Rewards */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
          <div className="space-y-3">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className="p-4 card-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{reward.title}</h4>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-points text-points-foreground">
                        {reward.points} points
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant={reward.available ? "default" : "secondary"}
                    disabled={!reward.available}
                    size="sm"
                  >
                    {reward.available ? "Redeem" : "Need More"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Impact</h3>
          <div className="space-y-3">
            {rewardsHistory.map((reward) => (
              <Card key={reward.id} className="p-4 card-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-points/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-points" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{reward.reason}</h4>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{reward.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-points text-points-foreground">
                    +{reward.points}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gamification Message */}
        <Card className="p-4 bg-success/5 border-success/20 text-center">
          <div className="space-y-2">
            <h3 className="font-medium text-success">🎯 Keep Going!</h3>
            <p className="text-sm text-muted-foreground">
              Report 2 more issues to unlock the "Community Hero" badge
            </p>
          </div>
        </Card>

        {/* Dialogs */}
        <PointsDialog
          open={showPoints}
          onOpenChange={setShowPoints}
        />
        
        <RedeemDialog
          open={redeemDialog}
          onOpenChange={setRedeemDialog}
        />
      </div>
    </div>
  );
};

export default Rewards;