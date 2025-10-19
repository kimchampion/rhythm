import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Sun, Moon, Footprints, CheckCircle2, Circle } from "lucide-react";

export function SeasonalPrehabScreen() {
  const weeks = [
    {
      week: 1,
      completed: true,
      tasks: ["10 min light therapy", "30 min daylight daily", "Sleep anchor set"],
    },
    {
      week: 2,
      completed: true,
      tasks: ["15 min light therapy", "35 min daylight daily", "Morning outdoor micro-walk"],
    },
    {
      week: 3,
      completed: false,
      tasks: ["20 min light therapy", "40 min daylight daily", "Vitamin D baseline"],
    },
    {
      week: 4,
      completed: false,
      tasks: ["Full protocol", "45 min daylight daily", "Weekly rhythm check"],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-[28px] font-semibold mb-1">Seasonal Pre-hab</h1>
        <p className="text-sm text-muted-foreground">
          4-week ramp to prevent autumn dips
        </p>
      </div>

      {/* Progress Overview */}
      <div className="px-6 mb-6">
        <Card className="p-5 rounded-[24px] bg-gradient-to-br from-[#D4A574]/5 to-transparent shadow-sm border-[#D4A574]/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Overall progress</span>
            <span className="text-sm font-medium">Week 2 of 4</span>
          </div>
          <Progress value={50} className="h-2 mb-3" />
          <p className="text-sm">
            You're building light exposure gradually — consistency matters more than perfection
          </p>
        </Card>
      </div>

      {/* Week Timeline */}
      <div className="px-6 mb-6">
        <h2 className="text-[20px] font-semibold mb-3">Your plan</h2>
        <div className="space-y-3">
          {weeks.map((week) => (
            <Card
              key={week.week}
              className={`p-4 rounded-[24px] shadow-sm ${
                week.completed
                  ? "border-[#8BA899]/20 bg-[#8BA899]/5"
                  : "border-border/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    week.completed
                      ? "bg-[#8BA899]/15"
                      : "bg-muted/50"
                  }`}
                >
                  {week.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#8BA899]" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-2">Week {week.week}</div>
                  <ul className="space-y-1.5">
                    {week.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Today's Actions */}
      <div className="px-6">
        <h2 className="text-[20px] font-semibold mb-3">Today's focus</h2>
        <div className="space-y-3">
          <Card className="p-4 rounded-[24px] border-primary/15 bg-primary/5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Sun className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">Light therapy session</div>
                <p className="text-sm text-muted-foreground mb-3">
                  15 minutes at 10,000 lux — best before 10am
                </p>
                <Button className="w-full rounded-full" size="sm">
                  Start timer
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-[24px] shadow-sm border-border/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
                <Footprints className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">Morning outdoor walk</div>
                <p className="text-sm text-muted-foreground mb-3">
                  5 minutes minimum — cloudy light still helps
                </p>
                <Button variant="outline" className="w-full rounded-full" size="sm">
                  Mark complete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
