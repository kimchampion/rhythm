import { useState } from "react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { User } from "lucide-react";

interface SupportLoopTileProps {
  name: string;
  relationship: string;
  onToggle?: (enabled: boolean) => void;
}

export function SupportLoopTile({ name, relationship, onToggle }: SupportLoopTileProps) {
  const [nudgeEnabled, setNudgeEnabled] = useState(false);

  const handleToggle = (checked: boolean) => {
    setNudgeEnabled(checked);
    onToggle?.(checked);
  };

  return (
    <Card className="p-4 rounded-[24px] shadow-sm border-border/30">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{name}</div>
          <div className="text-sm text-muted-foreground">{relationship}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Switch checked={nudgeEnabled} onCheckedChange={handleToggle} />
          <span className="text-xs text-muted-foreground">
            {nudgeEnabled ? "Active" : "Paused"}
          </span>
        </div>
      </div>
      {nudgeEnabled && (
        <div className="mt-3 p-3 bg-muted/50 rounded-[12px]">
          <p className="text-xs text-muted-foreground">
            They'll get a gentle reminder to check in with you today — no health data shared
          </p>
        </div>
      )}
    </Card>
  );
}
