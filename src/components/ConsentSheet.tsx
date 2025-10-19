import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Shield, Lock, Download, Eye } from "lucide-react";

interface ConsentSheetProps {
  open: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export function ConsentSheet({ open, onClose, onAccept }: ConsentSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-[28px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[20px]">
            <Shield className="w-6 h-6 text-primary" />
            Your data, your control
          </SheetTitle>
          <SheetDescription className="sr-only">
            Privacy policy and data control information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <p className="text-sm">
            Rhythm is built with privacy at its core. Here's exactly what happens with your data:
          </p>

          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-muted/30 rounded-[12px]">
              <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Stored locally</div>
                <p className="text-xs text-muted-foreground">
                  All your data stays on your device by default
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-muted/30 rounded-[12px]">
              <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">No tracking</div>
                <p className="text-xs text-muted-foreground">
                  We don't track, sell, or share your information
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-muted/30 rounded-[12px]">
              <Download className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Export anytime</div>
                <p className="text-xs text-muted-foreground">
                  Download or delete your data whenever you want
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-[20px]">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Important:</strong> Rhythm is not a medical
              device and does not diagnose or treat conditions. For mental health emergencies,
              please contact crisis services immediately.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => {
                onAccept?.();
                onClose();
              }}
              className="flex-1 rounded-full"
            >
              I understand
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-full"
            >
              Learn more
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
