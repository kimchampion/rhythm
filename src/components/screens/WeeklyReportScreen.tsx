import { PatternChart } from "../PatternChart";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Flame, TrendingUp, Calendar } from "lucide-react";

export function WeeklyReportScreen() {
  // Realistic sleep data showing some variability
  const sleepData = [
    { day: "Mon", value: 7.2 },
    { day: "Tue", value: 6.8 },
    { day: "Wed", value: 7.5 },
    { day: "Thu", value: 6.5 }, // Short night
    { day: "Fri", value: 7.0 },
    { day: "Sat", value: 8.2 }, // Catch-up sleep
    { day: "Sun", value: 7.8 },
  ];

  // Daylight exposure (autumn pattern - generally low)
  const daylightData = [
    { day: "Mon", value: 35 },
    { day: "Tue", value: 22 }, // Low daylight day
    { day: "Wed", value: 45 },
    { day: "Thu", value: 18 }, // Indoor day
    { day: "Fri", value: 28 },
    { day: "Sat", value: 52 }, // Better weekend exposure
    { day: "Sun", value: 48 },
  ];

  // Movement data (steps) - typical variation
  const movementData = [
    { day: "Mon", value: 6200 },
    { day: "Tue", value: 5100 },
    { day: "Wed", value: 7800 },
    { day: "Thu", value: 4500 }, // Low activity
    { day: "Fri", value: 5900 },
    { day: "Sat", value: 8200 }, // Active weekend
    { day: "Sun", value: 7400 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-[28px] font-semibold mb-1">Weekly Report</h1>
        <p className="text-sm text-muted-foreground">Oct 9 - Oct 15, 2025</p>
      </div>

      {/* Streaks */}
      <div className="px-6 mb-6">
        <Card className="p-5 rounded-[24px] bg-gradient-to-br from-[#D4A574]/5 to-transparent border-[#D4A574]/15 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#D4A574]/15 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#D4A574]" />
            </div>
            <div>
              <div className="text-[28px] font-semibold">12 days</div>
              <p className="text-sm text-muted-foreground">Tiny Win streak</p>
            </div>
          </div>
          <p className="text-sm">
            You've completed at least one Tiny Win every day this week. Consistency builds momentum.
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="px-6 space-y-4 mb-6">
        <PatternChart
          title="Sleep regularity"
          data={sleepData}
          unit="hrs"
          color="#7C8DB5"
          goal={7.5}
        />

        <PatternChart
          title="Daylight minutes"
          data={daylightData}
          unit="min"
          color="#D4A574"
          goal={45}
        />

        <PatternChart
          title="Movement"
          data={movementData}
          unit="steps"
          color="#8BA899"
          goal={7000}
        />
      </div>

      {/* Recommendation */}
      <div className="px-6">
        <Card className="p-5 rounded-[24px] border-primary/15 bg-primary/5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">This week's focus</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Your sleep timing varied by 2+ hours. Try setting a consistent bedtime anchor
                — even 30 minutes makes a difference.
              </p>
              <Badge className="bg-primary/10 text-primary border-0">
                <Calendar className="w-3 h-3 mr-1" />
                Sleep anchor
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
