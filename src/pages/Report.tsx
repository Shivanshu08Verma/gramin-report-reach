import { useState } from "react";
import { Plus, Camera, MapPin, ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import potholeImage from "@/assets/pothole-sample.jpg";
import streetlightImage from "@/assets/streetlight-sample.jpg";

// Mock data for past reports
const pastReports = [
  {
    id: 1,
    title: "Pothole on Main Street",
    location: "Main Street, Downtown",
    status: "Resolved",
    date: "Oct 12, 2024",
    points: 10,
    image: potholeImage
  },
  {
    id: 2,
    title: "Broken Street Light",
    location: "Elm Avenue",
    status: "In Progress", 
    date: "Oct 10, 2024",
    points: 15,
    image: streetlightImage
  },
  {
    id: 3,
    title: "Damaged Sidewalk",
    location: "Park Road",
    status: "Pending",
    date: "Oct 8, 2024",
    points: 8,
    image: potholeImage
  }
];

export const Report = () => {
  const [showNewIssue, setShowNewIssue] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning text-warning-foreground";
      case "In Progress": return "bg-primary text-primary-foreground";
      case "Resolved": return "bg-success text-success-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  if (showNewIssue) {
    return <NewIssueForm onBack={() => setShowNewIssue(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Report Issue</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* New Issue Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowNewIssue(true)}
            size="lg"
            className="civic-gradient text-primary-foreground rounded-full w-24 h-24 p-0 elevated-shadow hover:scale-105 transition-transform"
          >
            <div className="flex flex-col items-center gap-1">
              <Plus className="w-8 h-8" />
              <span className="text-xs font-medium">New Issue</span>
            </div>
          </Button>
        </div>

        {/* Past Reports */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Past Reports</h2>
          <div className="space-y-3">
            {pastReports.map((report) => (
              <Card key={report.id} className="p-4 card-shadow hover:elevated-shadow transition-all cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={report.image} 
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm">{report.title}</h3>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{report.date}</span>
                      <span className="text-points font-medium">+{report.points} points</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Rewards Preview */}
        <Card className="p-4 civic-gradient text-primary-foreground">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Keep Reporting!</h3>
            <p className="text-sm opacity-90">Earn points for every issue you report</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold">38</div>
                <div className="opacity-80">Total Points</div>
              </div>
              <div className="text-center">
                <div className="font-bold">3</div>
                <div className="opacity-80">Reports</div>
              </div>
              <div className="text-center">
                <div className="font-bold">1</div>
                <div className="opacity-80">Resolved</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const NewIssueForm = ({ onBack }: { onBack: () => void }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const takePicture = async () => {
    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        setCapturedImage(image.dataUrl);
        toast({
          title: "Photo captured!",
          description: "Your photo has been added to the report.",
        });
      }
    } catch (error) {
      // Fallback for web/desktop - show file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setCapturedImage(e.target?.result as string);
            toast({
              title: "Photo selected!",
              description: "Your photo has been added to the report.",
            });
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Report New Issue</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Issue Type Selection */}
        <div>
          <h2 className="font-semibold mb-3">What type of issue?</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { type: "Pothole", icon: "🕳️" },
              { type: "Street Light", icon: "💡" },
              { type: "Sidewalk", icon: "🚶" },
              { type: "Traffic Sign", icon: "🚧" },
              { type: "Garbage", icon: "🗑️" },
              { type: "Other", icon: "📝" }
            ].map(({ type, icon }) => (
              <Button key={type} variant="outline" className="h-16 flex-col gap-2">
                <span className="text-2xl">{icon}</span>
                <span className="text-sm">{type}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <Card className="p-6 border-2 border-dashed border-muted-foreground/25">
          <div className="text-center space-y-3">
            {capturedImage ? (
              <div className="space-y-3">
                <img 
                  src={capturedImage} 
                  alt="Captured issue" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button 
                  variant="outline" 
                  onClick={takePicture}
                  className="gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Take Another Photo
                </Button>
              </div>
            ) : (
              <>
                <Camera className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Add Photo</h3>
                  <p className="text-sm text-muted-foreground">Take a photo of the issue</p>
                </div>
                <Button 
                  className="civic-gradient text-primary-foreground gap-2"
                  onClick={takePicture}
                >
                  <Camera className="w-4 h-4" />
                  Open Camera
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Location */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">Current location will be used</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </Card>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Description (Optional)</label>
          <textarea 
            className="w-full p-3 border border-border rounded-lg resize-none h-24"
            placeholder="Describe the issue in detail..."
          />
        </div>

        {/* Submit Button */}
        <Button 
          className="w-full civic-gradient text-primary-foreground py-3"
          onClick={() => {
            // Simple success feedback
            alert("Report submitted successfully! You've earned 10 points.");
            onBack();
          }}
        >
          Submit Report
        </Button>
      </div>
    </div>
  );
};

export default Report;