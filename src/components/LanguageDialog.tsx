import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface LanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export const LanguageDialog = ({ open, onOpenChange }: LanguageDialogProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    const language = languages.find(l => l.code === langCode);
    onOpenChange(false);
    toast({
      title: "Language Updated",
      description: `Language changed to ${language?.name}. App will reload with new language.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Language / भाषा चुनें</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage === language.code ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => handleLanguageChange(language.code)}
            >
              <div className="text-left">
                <div className="font-medium">{language.name}</div>
                <div className="text-sm opacity-70">{language.nativeName}</div>
              </div>
              {selectedLanguage === language.code && (
                <Check className="w-4 h-4" />
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};