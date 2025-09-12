import { X } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
}

export function TeamMemberModal({ isOpen, onClose, member }: TeamMemberModalProps) {
  if (!member) return null;

  // Split the bio into paragraphs for better formatting
  const bioParagraphs = member.bio.split('\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className={cn(
        "max-w-4xl p-0 overflow-hidden h-[90vh] max-h-[800px]",
        "flex flex-col"
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full h-10 w-10 bg-background/80 hover:bg-background"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left side - Image and basic info */}
          <div className="md:w-2/5 bg-muted/50 p-8 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-primary/10">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder-user.jpg';
                }}
              />
            </div>
            <h3 className="text-2xl font-bold text-primary text-center mb-2">
              {member.name}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {member.role}
            </p>
          </div>
          
          {/* Right side - Bio */}
          <div className="md:w-3/5 p-8 overflow-y-auto">
            <h4 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-border">
              Biography
            </h4>
            <div className="prose prose-slate max-w-none">
              {bioParagraphs.length > 0 ? (
                bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-foreground/90 mb-4 last:mb-0 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground italic">No biography available.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
