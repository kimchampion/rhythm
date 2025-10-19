import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Moon, Sun } from "lucide-react";

interface SleepAnchorWidgetProps {
  bedtime: string;
  waketime: string;
  regularity: "excellent" | "good" | "variable";
  onEdit?: () => void;
}

export function SleepAnchorWidget({
  bedtime,
  waketime,
  regularity,
  onEdit,
}: SleepAnchorWidgetProps) {
  const regularityConfig = {
    excellent: { label: "Excellent", color: "bg-[#8BA899]/10 text-[#8BA899]" },
    good: { label: "Good", color: "bg-[#D4A574]/10 text-[#D4A574]" },
    variable: { label: "Variable", color: "bg-[#C9A569]/10 text-[#C9A569]" },
  };

  const config = regularityConfig[regularity];

  return (
    <Card className="p-4 rounded-[24px] shadow-sm border-border/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Sleep Anchor</h4>
        <Badge className={`${config.color} border-0`}>{config.label}</Badge>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 p-3 bg-muted/30 rounded-[16px] border border-border/20">
          <div className="flex items-center gap-2 mb-1">
            <Moon className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Bedtime</span>
          </div>
          <button
            onClick={onEdit}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {bedtime}
          </button>
        </div>

        <div className="flex-1 p-3 bg-muted/30 rounded-[16px] border border-border/20">
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Wake time</span>
          </div>
          <button
            onClick={onEdit}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {waketime}
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Consistent sleep timing anchors your daily rhythm
      </p>
    </Card>
  );
}
