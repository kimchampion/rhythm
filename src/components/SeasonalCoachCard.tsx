import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sun, Play, Pause, CloudSun } from "lucide-react";
import { Progress } from "./ui/progress";

interface SeasonalCoachCardProps {
  daylightMinutes: number;
  daylightGoal: number;
  weatherHint?: string;
}

export function SeasonalCoachCard({
  daylightMinutes,
  daylightGoal,
  weatherHint = "Partly cloudy, 52°F",
}: SeasonalCoachCardProps) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (daylightMinutes / daylightGoal) * 100;

  return (
    <Card className="p-5 rounded-[24px] bg-gradient-to-br from-[#D4A574]/5 to-transparent border-[#D4A574]/15 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-[#D4A574]" />
          <h3 className="text-[20px] font-semibold">Seasonal Coach</h3>
        </div>
        <CloudSun className="w-5 h-5 text-muted-foreground opacity-60" />
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[28px] font-semibold">{daylightMinutes}</span>
          <span className="text-sm text-muted-foreground">/ {daylightGoal} min daylight</span>
        </div>
        <Progress value={progress} className="h-2 mb-1" />
        <p className="text-xs text-muted-foreground">{weatherHint}</p>
      </div>

      {/* Light Therapy Timer */}
      <div className="p-3 bg-background/60 backdrop-blur-sm rounded-[16px] mb-3 border border-border/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Light therapy (10,000 lux)</span>
          <span className="text-sm font-medium">{formatTime(timerSeconds)}</span>
        </div>
        <Button
          variant={timerRunning ? "outline" : "default"}
          size="sm"
          onClick={() => setTimerRunning(!timerRunning)}
          className="w-full rounded-full"
        >
          {timerRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start session
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 Morning light helps anchor your circadian rhythm
      </p>
    </Card>
  );
}
