import { useState } from "react";
import { Bell, Filter, MapPin, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ReportDetailsDialog } from "@/components/ReportDetailsDialog";
import potholeImage from "@/assets/pothole-sample.jpg";
import streetlightImage from "@/assets/streetlight-sample.jpg";

// Mock data for community reports
const communityReports = [
  {
    id: 1,
    title: "Large Pothole on Elm Street",
    location: "123 Elm Street",
    reporter: { name: "John D.", avatar: "/placeholder.svg" },
    timeAgo: "2 hours ago",
    status: "Pending",
    views: 15,
    image: potholeImage,
    type: "pothole"
  },
  {
    id: 2,
    title: "Broken Streetlight on Main St",
    location: "456 Main Street",
    reporter: { name: "Sarah M.", avatar: "/placeholder.svg" },
    timeAgo: "5 hours ago",
    status: "In Progress",
    views: 8,
    image: streetlightImage,
    type: "streetlight"
  },
  {
    id: 3,
    title: "Damaged Sidewalk Near Park",
    location: "789 Park Avenue",
    reporter: { name: "Mike R.", avatar: "/placeholder.svg" },
    timeAgo: "1 day ago",
    status: "Resolved",
    views: 23,
    image: potholeImage,
    type: "sidewalk"
  }
];

export const Feed = () => {
  const [filter, setFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<typeof communityReports[0] | null>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "warning";
      case "In Progress": return "primary";
      case "Resolved": return "success";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CC</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">CityConnect</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Community Reports Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Community Reports</h2>
            <p className="text-muted-foreground text-sm">Help improve your neighborhood</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {communityReports.map((report) => (
            <Card key={report.id} className="p-4 card-shadow hover:elevated-shadow transition-all cursor-pointer">
              <div className="space-y-3">
                {/* Report Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={report.image} 
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      getStatusColor(report.status) === 'warning' ? 'bg-warning text-warning-foreground' :
                      getStatusColor(report.status) === 'success' ? 'bg-success text-success-foreground' :
                      'bg-primary text-primary-foreground'
                    }`}
                  >
                    {report.status}
                  </Badge>
                </div>

                {/* Report Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{report.location}</span>
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={report.reporter.avatar} />
                      <AvatarFallback className="text-xs">{report.reporter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reported by </span>
                      <span className="font-medium">{report.reporter.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{report.timeAgo}</span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{report.views}</span>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => {
                      setSelectedReport(report);
                      setShowReportDetails(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ReportDetailsDialog
        open={showReportDetails}
        onOpenChange={setShowReportDetails}
        report={selectedReport}
      />
    </div>
  );
};

export default Feed;