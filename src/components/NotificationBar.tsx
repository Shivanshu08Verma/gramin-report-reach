import { useState } from "react";
import { X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between text-sm fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        <span className="font-medium">CityConnect is active</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-primary-foreground hover:bg-primary-foreground/20 h-6 px-2"
        >
          <Home className="w-3 h-3 mr-1" />
          Open App
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-primary-foreground hover:bg-primary-foreground/20 h-6 w-6 p-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};