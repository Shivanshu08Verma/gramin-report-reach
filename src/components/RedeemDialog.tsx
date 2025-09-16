import { Gift, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface RedeemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
  },
  {
    id: 4,
    title: "Grocery Voucher",
    points: 200,
    description: "₹200 grocery voucher",
    available: true
  }
];

export const RedeemDialog = ({ open, onOpenChange }: RedeemDialogProps) => {
  const { toast } = useToast();
  const userPoints = 250; // This would come from state/props

  const handleRedeem = (reward: typeof availableRewards[0]) => {
    if (userPoints >= reward.points) {
      toast({
        title: "Reward Redeemed!",
        description: `You have successfully redeemed ${reward.title}. Check your email for details.`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Redeem Rewards
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <div className="text-lg font-bold text-primary">{userPoints} Points Available</div>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {availableRewards.map((reward) => {
            const canRedeem = userPoints >= reward.points;
            
            return (
              <Card key={reward.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{reward.title}</h4>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-points text-points-foreground">
                        {reward.points} points
                      </Badge>
                      {canRedeem && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <Button 
                    variant={canRedeem ? "default" : "secondary"}
                    disabled={!canRedeem}
                    size="sm"
                    onClick={() => handleRedeem(reward)}
                  >
                    {canRedeem ? "Redeem" : "Need More"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};