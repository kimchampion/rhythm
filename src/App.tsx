import { useState, useEffect } from "react";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { ConsentScreen } from "./components/screens/ConsentScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { ActionsScreen } from "./components/screens/ActionsScreen";
import { WeeklyReportScreen } from "./components/screens/WeeklyReportScreen";
import { SupportLoopScreen } from "./components/screens/SupportLoopScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { SeasonalPrehabScreen } from "./components/screens/SeasonalPrehabScreen";
import { PostpartumScreen } from "./components/screens/PostpartumScreen";
import { BipolarScreen } from "./components/screens/BipolarScreen";
import { CheckInModal } from "./components/CheckInModal";
import { CrisisSheet } from "./components/CrisisSheet";
import { BottomNav } from "./components/BottomNav";
import { DemoHelper } from "./components/DemoHelper";
import { MobileStatusBar } from "./components/MobileStatusBar";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

type Screen = "onboarding" | "consent" | "home" | "actions" | "report" | "support" | "settings";
type SpecializedPath = "seasonal" | "postpartum" | "bipolar" | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [specializedPath, setSpecializedPath] = useState<SpecializedPath>(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [crisisSheetOpen, setCrisisSheetOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle onboarding completion
  const handleOnboardingComplete = (focus: string) => {
    if (focus === "seasonal") setSpecializedPath("seasonal");
    if (focus === "postpartum") setSpecializedPath("postpartum");
    if (focus === "bipolar") setSpecializedPath("bipolar");
    setCurrentScreen("consent");
  };

  // Handle consent completion
  const handleConsentComplete = () => {
    setHasOnboarded(true);
    setCurrentScreen("home");
    setTimeout(() => {
      toast("Welcome to Rhythm", {
        description: "Start with a quick check-in or browse tiny wins below.",
      });
    }, 500);
  };

  // Handle check-in completion
  const handleCheckInComplete = (data: any) => {
    toast.success("Check-in complete! Great start to the day.", {
      description: "We've logged your rhythm data.",
    });
  };

  // Handle tiny win completion
  const handleTinyWin = (action: string) => {
    toast.success(`${action} — you did it!`, {
      description: "Small wins add up to big momentum.",
    });
  };

  // Handle navigation changes
  const handleNavChange = (tab: "home" | "actions" | "report" | "support" | "settings") => {
    setCurrentScreen(tab);
  };

  // Render specialized path screens
  const renderSpecializedScreen = () => {
    switch (specializedPath) {
      case "seasonal":
        return <SeasonalPrehabScreen />;
      case "postpartum":
        return <PostpartumScreen />;
      case "bipolar":
        return <BipolarScreen />;
      default:
        return null;
    }
  };

  // Render current screen
  const renderScreen = () => {
    if (!hasOnboarded) {
      if (currentScreen === "onboarding") {
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      }
      if (currentScreen === "consent") {
        return <ConsentScreen onComplete={handleConsentComplete} />;
      }
    }

    // Main app screens
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onCheckIn={() => setCheckInOpen(true)}
            onTinyWin={handleTinyWin}
          />
        );
      case "actions":
        // Show specialized path if available, otherwise show general actions
        return specializedPath ? renderSpecializedScreen() : <ActionsScreen onComplete={handleTinyWin} />;
      case "report":
        return <WeeklyReportScreen />;
      case "support":
        return <SupportLoopScreen />;
      case "settings":
        return <SettingsScreen onCrisisSheet={() => setCrisisSheetOpen(true)} />;
      default:
        return <HomeScreen onCheckIn={() => setCheckInOpen(true)} onTinyWin={handleTinyWin} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Device Frame - iOS 390×844 */}
      <div className="mx-auto max-w-[390px] min-h-screen bg-gradient-to-b from-background via-background to-muted/10 relative">
        {/* Status Bar */}
        {hasOnboarded && <MobileStatusBar />}
        
        {/* Theme Toggle */}
        {hasOnboarded && (
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-12 right-4 z-50 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Main Content */}
        {renderScreen()}

        {/* Bottom Navigation */}
        {hasOnboarded && (
          <BottomNav activeTab={currentScreen} onTabChange={handleNavChange} />
        )}

        {/* Demo Helper */}
        {hasOnboarded && <DemoHelper />}

        {/* Check-in Modal */}
        <CheckInModal
          open={checkInOpen}
          onClose={() => setCheckInOpen(false)}
          onComplete={handleCheckInComplete}
        />

        {/* Crisis Sheet */}
        <CrisisSheet open={crisisSheetOpen} onClose={() => setCrisisSheetOpen(false)} />

        {/* Toast Notifications */}
        <Toaster />
      </div>

      {/* Android Frame Preview - 360×800 (hidden by default, for reference) */}
      <div className="hidden">
        <div className="mx-auto max-w-[360px] min-h-[800px] bg-background">
          {/* Android version would render here with adjusted spacing */}
        </div>
      </div>
    </div>
  );
}
