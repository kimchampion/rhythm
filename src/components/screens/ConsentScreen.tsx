import { useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Card } from "../ui/card";
import { Moon, Footprints, Bell, Shield } from "lucide-react";

interface ConsentScreenProps {
  onComplete: () => void;
}

export function ConsentScreen({ onComplete }: ConsentScreenProps) {
  const [permissions, setPermissions] = useState({
    sleep: false,
    activity: false,
    notifications: false,
  });

  const permissionOptions = [
    {
      id: "sleep" as const,
      icon: Moon,
      title: "Sleep data",
      description: "Help track your sleep patterns and consistency",
      benefit: "Better insights into your rhythm stability",
    },
    {
      id: "activity" as const,
      icon: Footprints,
      title: "Movement & steps",
      description: "Monitor daily activity levels",
      benefit: "Understand how movement affects your mood",
    },
    {
      id: "notifications" as const,
      icon: Bell,
      title: "Gentle reminders",
      description: "Timely nudges for tiny wins and check-ins",
      benefit: "Stay consistent with minimal effort",
    },
  ];

  const togglePermission = (id: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 pt-12">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold mb-2">Your data, your choice</h1>
          <p className="text-muted-foreground">
            All permissions are optional. You can change these anytime in settings.
          </p>
        </div>

        <div className="space-y-3 flex-1">
          {permissionOptions.map((option) => {
            const Icon = option.icon;
            const isEnabled = permissions[option.id];

            return (
              <Card key={option.id} className="p-4 rounded-[24px] shadow-sm border-border/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{option.title}</span>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => togglePermission(option.id)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {option.description}
                    </p>
                  </div>
                </div>
                {isEnabled && (
                  <div className="pl-13 p-3 bg-primary/5 rounded-[16px] text-sm border border-primary/10">
                    ✓ {option.benefit}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-6 space-y-4">
          <Card className="p-4 rounded-[24px] bg-muted/20 border-border/30 shadow-sm">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Privacy guarantee</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Data stays on your device by default</li>
                  <li>• No tracking, selling, or sharing without consent</li>
                  <li>• Export or delete anytime</li>
                  <li>• Rhythm is not a medical device</li>
                </ul>
              </div>
            </div>
          </Card>

          <Button onClick={onComplete} className="w-full rounded-full h-12">
            Continue to Rhythm
          </Button>

          <button
            onClick={onComplete}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
