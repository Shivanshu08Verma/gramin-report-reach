import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Eye, Heart, MessageCircle, Share2 } from "lucide-react";

interface ReportDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    id: number;
    title: string;
    location: string;
    reporter: { name: string; avatar: string };
    timeAgo: string;
    status: string;
    views: number;
    image: string;
    type: string;
  } | null;
}

export const ReportDetailsDialog = ({ open, onOpenChange, report }: ReportDetailsDialogProps) => {
  if (!report) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning text-warning-foreground";
      case "In Progress": return "bg-primary text-primary-foreground";
      case "Resolved": return "bg-success text-success-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Report Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Report Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img 
              src={report.image} 
              alt={report.title}
              className="w-full h-full object-cover"
            />
            <Badge className={`absolute top-3 right-3 ${getStatusColor(report.status)}`}>
              {report.status}
            </Badge>
          </div>

          {/* Title and Location */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">{report.title}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{report.location}</span>
            </div>
          </div>

          {/* Reporter Info */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={report.reporter.avatar} />
                <AvatarFallback className="text-sm">{report.reporter.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{report.reporter.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{report.timeAgo}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{report.views}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground">
              This {report.type} issue was reported and requires immediate attention from the municipal authorities. 
              The condition poses a safety risk to pedestrians and vehicles in the area.
            </p>
          </div>

          {/* Department Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Assigned Department</h3>
            <p className="text-muted-foreground">
              {report.type === 'pothole' ? 'Road Maintenance Department' : 
               report.type === 'streetlight' ? 'Electrical Department' : 
               'Public Works Department'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Heart className="w-4 h-4" />
              Support
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <MessageCircle className="w-4 h-4" />
              Comment
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};