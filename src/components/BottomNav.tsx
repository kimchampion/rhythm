import { Home, Zap, BarChart3, Users, Settings } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "actions" | "report" | "support" | "settings";
  onTabChange: (tab: BottomNavProps["activeTab"]) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "actions" as const, label: "Actions", icon: Zap },
    { id: "report" as const, label: "Report", icon: BarChart3 },
    { id: "support" as const, label: "Support", icon: Users },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/30 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 min-w-[44px] flex-1 transition-colors"
            >
              <Icon 
                className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? "text-[#487BF5] dark:text-[#8DACF5]" 
                    : ""
                }`}
              />
              <span className={`text-[10px] transition-colors ${
                isActive ? "text-muted-foreground" : "text-muted-foreground"
              }`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
