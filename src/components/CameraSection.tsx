import { useState, useEffect } from "react";
import { ArrowLeft, Camera, RotateCcw, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';

interface CameraSectionProps {
  onBack: () => void;
  onPhotoTaken: (imageUrl: string, location?: { latitude: number; longitude: number; address?: string }) => void;
}

export const CameraSection = ({ onBack, onPhotoTaken }: CameraSectionProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address?: string } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  // Get user's location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Use a free geocoding service
            let address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            
            try {
              // Try Nominatim (OpenStreetMap) free service
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
              );
              
              if (response.ok) {
                const data = await response.json();
                const addressComponents = data.address || {};
                
                // Extract city and state/region
                const city = addressComponents.city || 
                            addressComponents.town || 
                            addressComponents.village || 
                            addressComponents.suburb ||
                            addressComponents.neighbourhood;
                            
                const state = addressComponents.state || 
                             addressComponents.province || 
                             addressComponents.region;
                
                if (city && state) {
                  address = `${city}, ${state}`;
                } else if (city) {
                  address = city;
                } else if (data.display_name) {
                  // Fallback to formatted address, try to extract place, state
                  const parts = data.display_name.split(',').map(p => p.trim());
                  if (parts.length >= 2) {
                    address = `${parts[0]}, ${parts[parts.length - 2]}`;
                  } else {
                    address = parts[0] || address;
                  }
                }
              }
            } catch (error) {
              console.log('Geocoding failed, using coordinates');
            }
            
            setLocation({ latitude, longitude, address });
            setIsLoadingLocation(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            toast({
              title: "Location access denied",
              description: "Location will not be included in the report.",
              variant: "destructive",
            });
            setIsLoadingLocation(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
      } else {
        toast({
          title: "Location not supported",
          description: "Your device doesn't support location services.",
          variant: "destructive",
        });
        setIsLoadingLocation(false);
      }
    } catch (error) {
      console.error('Location error:', error);
      setIsLoadingLocation(false);
    }
  };

  const takePicture = async () => {
    setIsCapturing(true);
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
          description: "Review your photo and confirm to continue.",
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
            const result = e.target?.result as string;
            setCapturedImage(result);
            toast({
              title: "Photo selected!",
              description: "Review your photo and confirm to continue.",
            });
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
    setIsCapturing(false);
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onPhotoTaken(capturedImage, location || undefined);
      onBack();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Take Photo</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Camera Instructions */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">Capture the Issue</h2>
          <p className="text-muted-foreground text-sm">
            Take a clear photo of the problem you want to report
          </p>
        </div>

        {/* Camera Preview/Captured Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border-2 border-dashed border-muted-foreground/25">
          {capturedImage ? (
            <img 
              src={capturedImage} 
              alt="Captured issue" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isCapturing ? "Opening camera..." : "Tap to capture photo"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="space-y-4">
          {!capturedImage ? (
            <Button 
              className="w-full civic-gradient text-primary-foreground py-4 text-lg"
              onClick={takePicture}
              disabled={isCapturing}
            >
              <Camera className="w-6 h-6 mr-2" />
              {isCapturing ? "Opening Camera..." : "Open Camera"}
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={retakePhoto}
                className="py-4 gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake
              </Button>
              <Button 
                className="civic-gradient text-primary-foreground py-4 gap-2"
                onClick={confirmPhoto}
              >
                <Check className="w-5 h-5" />
                Use Photo
              </Button>
            </div>
          )}
        </div>

        {/* Location Info */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-sm">Location</h3>
          </div>
          {isLoadingLocation ? (
            <p className="text-sm text-muted-foreground">Getting location...</p>
          ) : location ? (
            <p className="text-sm text-muted-foreground">{location.address}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Location not available</p>
          )}
        </div>

        {/* Tips */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-sm">Photography Tips:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ensure good lighting for clear visibility</li>
            <li>• Get close enough to show the problem clearly</li>
            <li>• Include surrounding context when helpful</li>
            <li>• Make sure the issue is the main focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
};