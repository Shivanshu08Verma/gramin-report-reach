import { Trophy, Medal, Star, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const leaderboardData = [
  { id: 1, name: "Priya Sharma", points: 1250, reports: 42, rank: 1, avatar: "PS" },
  { id: 2, name: "Rajesh Kumar", points: 980, reports: 35, rank: 2, avatar: "RK" },
  { id: 3, name: "Anita Singh", points: 850, reports: 28, rank: 3, avatar: "AS" },
  { id: 4, name: "John Doe", points: 750, reports: 25, rank: 4, avatar: "JD" },
  { id: 5, name: "Deepak Patel", points: 620, reports: 22, rank: 5, avatar: "DP" },
];

export const LeaderboardDialog = ({ open, onOpenChange }: LeaderboardDialogProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
      case 2: return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 3: return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
      default: return "bg-background border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Community Leaderboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {leaderboardData.map((user) => (
            <Card key={user.id} className={`p-4 ${getRankBg(user.rank)}`}>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-points text-points-foreground text-xs">
                      {user.points} pts
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {user.reports} reports
                    </span>
                  </div>
                </div>
                {user.rank <= 3 && (
                  <Star className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};