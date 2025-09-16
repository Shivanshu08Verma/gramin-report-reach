import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  field: string;
  currentValue: string;
  onSave: (value: string) => void;
}

export const EditProfileDialog = ({ open, onOpenChange, field, currentValue, onSave }: EditProfileDialogProps) => {
  const [value, setValue] = useState(currentValue);
  const { toast } = useToast();

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
      onOpenChange(false);
      toast({
        title: "Profile Updated",
        description: `Your ${field.toLowerCase()} has been updated successfully.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit {field}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="field-input">{field}</Label>
            <Input
              id="field-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter your ${field.toLowerCase()}`}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};