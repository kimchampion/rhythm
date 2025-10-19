import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Phone, MessageCircle, AlertCircle } from "lucide-react";

interface CrisisSheetProps {
  open: boolean;
  onClose: () => void;
}

export function CrisisSheet({ open, onClose }: CrisisSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-[28px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[20px]">
            <AlertCircle className="w-6 h-6 text-[#EF4444]" />
            If you feel unsafe
          </SheetTitle>
          <SheetDescription className="sr-only">
            Emergency crisis resources and helpline contacts
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <p>
            If you're feeling unsafe or in crisis, please reach out to trained support right away.
          </p>

          <div className="space-y-3">
            <Button
              className="w-full rounded-full h-14 bg-[#C17B7B] hover:bg-[#B06B6B] shadow-sm hover:shadow transition-all"
              onClick={() => window.open("tel:988")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 988 — Suicide & Crisis Lifeline
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-full h-14"
              onClick={() => window.open("sms:988")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Text 988
            </Button>
          </div>

          <div className="p-4 bg-muted/30 rounded-[20px] space-y-2 text-sm border border-border/30">
            <p className="font-medium">Other resources:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Crisis Text Line: Text HOME to 741741</li>
              <li>• Veterans Crisis Line: 1-800-273-8255, press 1</li>
              <li>• SAMHSA Helpline: 1-800-662-4357</li>
              <li>• International: findahelpline.com</li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            These services are free, confidential, and available 24/7
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
