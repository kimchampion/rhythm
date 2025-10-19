import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { HelpCircle, CheckCircle2 } from "lucide-react";

export function DemoHelper() {
  const [open, setOpen] = useState(false);

  const features = [
    {
      name: "Onboarding Flow",
      description: "3-slide intro → privacy pledge → focus selection",
      path: "Starts automatically on first load",
    },
    {
      name: "Home/Compass",
      description: "Alignment score, drift alerts, tiny wins, seasonal coach",
      path: "Home tab (house icon)",
    },
    {
      name: "Morning Check-in",
      description: "Mood emoji, energy sliders, dissonance detection",
      path: "Tap 'Morning check-in' button on Home",
    },
    {
      name: "Tiny Wins Library",
      description: "30-90s actions organized by category",
      path: "Actions tab (lightning icon)",
    },
    {
      name: "Specialized Paths",
      description: "Seasonal/Postpartum/Bipolar specific screens",
      path: "Select during onboarding, then view in Actions tab",
    },
    {
      name: "Weekly Report",
      description: "Charts, streaks, personalized recommendations",
      path: "Report tab (chart icon)",
    },
    {
      name: "Support Loop",
      description: "Trusted contacts, message templates, privacy-first nudges",
      path: "Support tab (users icon)",
    },
    {
      name: "Settings & Privacy",
      description: "Data permissions, export, delete account, crisis resources",
      path: "Settings tab (gear icon)",
    },
    {
      name: "Crisis Sheet",
      description: "Emergency helplines (988, etc.)",
      path: "Settings → Emergency helplines",
    },
    {
      name: "Dark Mode",
      description: "Toggle light/dark theme",
      path: "Moon/Sun button (top right)",
    },
    {
      name: "Dissonance Detection",
      description: "Evening check when self-rating doesn't match data",
      path: "Tap 'Demo' button on Home to preview",
    },
    {
      name: "Midday Nudge",
      description: "Contextual reminders with quick timers",
      path: "Appears automatically 12pm-5pm on Home",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <HelpCircle className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-[28px] max-h-[80vh] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-[20px]">Rhythm Demo Guide</SheetTitle>
          <SheetDescription className="sr-only">
            Interactive guide to explore all features of the Rhythm mental wellness app
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted-foreground mt-4">
            Explore all the features of this mental wellness prototype. Each interaction is
            designed to take less than 30 seconds.
          </p>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-[20px] border border-border"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium mb-1">{feature.name}</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                    <div className="text-xs text-primary bg-primary/5 rounded-full px-3 py-1 inline-block">
                      {feature.path}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-muted/30 rounded-[20px]">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> This is a high-fidelity prototype. All data is stored
              locally in your browser. The app is designed for iOS (390×844) but adapts to
              various mobile screens.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
