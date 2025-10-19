import { Wifi, Battery, Signal } from "lucide-react";

export function MobileStatusBar() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm">
      <div className="max-w-[390px] mx-auto px-6 py-2 flex items-center justify-between text-xs">
        <span className="font-medium">{timeString}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
