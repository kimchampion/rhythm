import { useState } from "react";
import { AlignmentScoreCard } from "../AlignmentScoreCard";
import { TinyWinChip } from "../TinyWinChip";
import { SeasonalCoachCard } from "../SeasonalCoachCard";
import { NudgeCard } from "../NudgeCard";
import { DissonanceCard } from "../DissonanceCard";
import { Alert } from "../ui/alert";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";

interface HomeScreenProps {
  onCheckIn?: () => void;
  onTinyWin?: (action: string) => void;
}

export function HomeScreen({ onCheckIn, onTinyWin }: HomeScreenProps) {
  const [completedWins, setCompletedWins] = useState<Set<string>>(new Set());
  const [showNudge, setShowNudge] = useState(true);
  const [showDissonance, setShowDissonance] = useState(false);

  // Simulate showing dissonance check in the evening
  const currentHour = new Date().getHours();
  const isEvening = currentHour >= 17;

  const tinyWins = [
    { id: "sunlight", label: "Sunlight break (2 min)", icon: "sun" as const },
    { id: "water", label: "Sip water", icon: "droplet" as const },
    { id: "breathe", label: "3 breaths", icon: "wind" as const },
  ];

  const handleWinClick = (id: string, label: string) => {
    setCompletedWins((prev) => new Set(prev).add(id));
    onTinyWin?.(label);
  };

  return (
    <div className="min-h-screen bg-background pb-20 animate-in fade-in duration-300">
      {/* Header - Sticky */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-md pt-6 pb-4 px-6 border-b border-border/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-semibold">Rhythm Compass</h1>
            <p className="text-sm text-muted-foreground">Wednesday, Oct 15</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDissonance(!showDissonance)}
              className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              title="Toggle dissonance demo"
            >
              Demo
            </button>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Scrollable Content */}
      <div className="p-6 pt-16">
        {/* Drift Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Alert className="mb-4 border-[#C9A569]/20 bg-[#C9A569]/5 shadow-sm rounded-[20px]">
            <AlertCircle className="h-4 w-4 text-[#C9A569]" />
            <div className="ml-2">
              <p className="text-sm font-medium">Slight drift detected</p>
              <p className="text-xs text-muted-foreground mt-1 opacity-80">
                Your sleep timing varied by 2+ hours this week
              </p>
            </div>
          </Alert>
        </motion.div>

        {/* Alignment Score */}
        <AlignmentScoreCard
          score={72}
          status="ok"
          sparklineData={[65, 70, 68, 75, 72, 70, 72]}
        />
      </div>

      {/* Today's Tiny Wins */}
      <motion.div 
        className="px-6 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-[20px] font-semibold mb-3">Today's Tiny Wins</h2>
        <div className="flex flex-wrap gap-2">
          {tinyWins.map((win, index) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <TinyWinChip
                label={win.label}
                icon={win.icon}
                variant={
                  completedWins.has(win.id)
                    ? "completed"
                    : "suggested"
                }
                onClick={() => handleWinClick(win.id, win.label)}
              />
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Small actions, big impact — each one counts
        </p>
      </motion.div>

      {/* Midday Nudge */}
      <AnimatePresence>
        {showNudge && currentHour >= 12 && currentHour < 17 && (
          <motion.div 
            className="px-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
          <NudgeCard
            title="Perfect timing"
            description="Sunny window at 2pm — 5 minutes outside now?"
            action="Start 5-min timer"
            duration={300}
            onComplete={() => {
              setShowNudge(false);
              onTinyWin?.("5-minute outdoor break");
            }}
            onDismiss={() => setShowNudge(false)}
          />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evening Dissonance Check */}
      <AnimatePresence>
        {showDissonance && isEvening && (
          <motion.div 
            className="px-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <DissonanceCard
              message="You rated yourself 'fine' this morning, but your energy and movement were lower than usual."
              suggestion="Send yourself a kind note or do one gentle thing before bed — even 30 seconds counts."
              onAction={() => {
                setShowDissonance(false);
                onTinyWin?.("Self-compassion moment");
              }}
              onDismiss={() => setShowDissonance(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seasonal Coach */}
      <div className="px-6 mb-6">
        <SeasonalCoachCard
          daylightMinutes={22}
          daylightGoal={45}
          weatherHint="Partly cloudy, 52°F — good window at 2pm"
        />
      </div>

      {/* Check-in CTA */}
      <motion.div 
        className="px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(124, 141, 181, 0)",
              "0 0 0 4px rgba(124, 141, 181, 0.1)",
              "0 0 0 0 rgba(124, 141, 181, 0)"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="rounded-full"
        >
          <Button
            onClick={onCheckIn}
            variant="outline"
            className="w-full rounded-full h-12 border-primary/30 hover:bg-primary/5"
          >
            Morning check-in
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
