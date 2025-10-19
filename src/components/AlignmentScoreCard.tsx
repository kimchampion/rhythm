import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "./ui/card";

interface AlignmentScoreCardProps {
  score: number;
  status: "good" | "ok" | "drifting";
  sparklineData?: number[];
}

export function AlignmentScoreCard({ score, status, sparklineData = [] }: AlignmentScoreCardProps) {
  const statusConfig = {
    good: {
      label: "Aligned",
      color: "text-[#8BA899]",
      bg: "bg-[#8BA899]/8",
      icon: TrendingUp,
    },
    ok: {
      label: "Slight drift",
      color: "text-[#D4A574]",
      bg: "bg-[#D4A574]/8",
      icon: Minus,
    },
    drifting: {
      label: "Off rhythm — let's try one small thing",
      color: "text-[#C9A569]",
      bg: "bg-[#C9A569]/8",
      icon: TrendingDown,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className={`p-6 rounded-[24px] ${config.bg} border border-border/30 shadow-sm`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-5 h-5 ${config.color}`} />
            <span className={`${config.color}`}>{config.label}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-semibold">{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        {sparklineData.length > 0 && (
          <div className="flex items-end gap-0.5 h-12">
            {sparklineData.map((value, i) => (
              <div
                key={i}
                className={`w-1 rounded-full ${config.color} bg-current opacity-60`}
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Your rhythm compass — tracking sleep, light, movement, and connection
      </p>
      <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5 opacity-70">
        <span className="inline-block w-1.5 h-1.5 bg-primary/30 rounded-full" />
        Data stays on your device unless you choose to share
      </div>
    </Card>
  );
}
