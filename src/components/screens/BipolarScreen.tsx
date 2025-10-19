import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SleepAnchorWidget } from "../SleepAnchorWidget";
import { Badge } from "../ui/badge";
import { Activity, Moon, Zap, Shield, TrendingUp } from "lucide-react";

export function BipolarScreen() {
  const [paceToggles, setPaceToggles] = useState({
    highEnergy: false,
    rapidThoughts: false,
    lessSleep: false,
    impulsive: false,
  });

  const paceOptions = [
    { id: "highEnergy" as const, label: "Higher energy than usual" },
    { id: "rapidThoughts" as const, label: "Thoughts racing" },
    { id: "lessSleep" as const, label: "Less sleep needed" },
    { id: "impulsive" as const, label: "More impulsive" },
  ];

  const activatedCount = Object.values(paceToggles).filter(Boolean).length;

  const safeguards = [
    { label: "De-load schedule", icon: Activity },
    { label: "Strengthen bedtime anchor", icon: Moon },
    { label: "Reduce stimulation", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-[28px] font-semibold mb-1">Early-Signs Tracker</h1>
        <p className="text-sm text-muted-foreground">
          Catch subtle shifts before they grow
        </p>
      </div>

      {/* Pace of Day */}
      <div className="px-6 mb-6">
        <h2 className="text-[20px] font-semibold mb-2">How's your pace today?</h2>
        <p className="text-sm text-muted-foreground mb-3">
          These aren't "bad" — just signals worth noticing
        </p>

        <div className="space-y-2">
          {paceOptions.map((option) => {
            const isActive = paceToggles[option.id];
            return (
              <button
                key={option.id}
                onClick={() =>
                  setPaceToggles((prev) => ({
                    ...prev,
                    [option.id]: !prev[option.id],
                  }))
                }
                className={`w-full p-4 rounded-[24px] border-2 transition-all text-left shadow-sm ${
                  isActive
                    ? "border-[#C9A569]/30 bg-[#C9A569]/8 shadow"
                    : "border-border/30 hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{option.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isActive
                        ? "border-[#C9A569] bg-[#C9A569]"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-background" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {activatedCount > 0 && (
          <Card className="mt-4 p-4 rounded-[24px] bg-[#C9A569]/5 border-[#C9A569]/15 shadow-sm">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-[#C9A569] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">
                  {activatedCount} shift{activatedCount > 1 ? "s" : ""} noticed
                </p>
                <p className="text-sm text-muted-foreground">
                  Consider these gentle safeguards to help stabilize your rhythm
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Sleep Anchor */}
      <div className="px-6 mb-6">
        <h2 className="text-[20px] font-semibold mb-3">Your strongest anchor</h2>
        <SleepAnchorWidget
          bedtime="10:30 PM"
          waketime="6:30 AM"
          regularity="excellent"
        />
      </div>

      {/* Safeguards */}
      {activatedCount >= 2 && (
        <div className="px-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-[20px] font-semibold">Suggested safeguards</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Small adjustments to protect your rhythm
          </p>

          <div className="space-y-2">
            {safeguards.map((safeguard, index) => {
              const Icon = safeguard.icon;
              return (
                <Card key={index} className="p-4 rounded-[24px] shadow-sm border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{safeguard.label}</span>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full">
                      Learn more
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
