import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X, Timer, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NudgeCardProps {
  title: string;
  description: string;
  action: string;
  duration?: number; // in seconds
  onComplete?: () => void;
  onDismiss?: () => void;
}

export function NudgeCard({
  title,
  description,
  action,
  duration = 300,
  onComplete,
  onDismiss,
}: NudgeCardProps) {
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [completed, setCompleted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setTimerActive(false);
          setCompleted(true);
          setJustCompleted(true);
          onComplete?.();
          
          setTimeout(() => setJustCompleted(false), 2000);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        <Card className="p-5 rounded-[24px] bg-[#8BA899]/8 border-[#8BA899]/15 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 15,
                delay: 0.1 
              }}
            >
              <CheckCircle2 className="w-6 h-6 text-[#8BA899]" />
            </motion.div>
            <div className="flex-1">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-semibold text-[#8BA899]"
              >
                Complete!
              </motion.div>
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground"
              >
                Great job taking that moment
              </motion.p>
            </div>
          </div>

          {/* Celebration sparkles */}
          <AnimatePresence>
            {justCompleted && (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: 0, x: 10, y: 10 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: 180,
                    x: [10, 30, 50],
                    y: [10, -10, -30]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-4 h-4 text-[#D4A574]" fill="#D4A574" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0, rotate: 0, x: -10, y: 20 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: -180,
                    x: [-10, -30, -50],
                    y: [20, 10, -10]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="absolute bottom-4 left-4"
                >
                  <Sparkles className="w-4 h-4 text-[#7C8DB5]" fill="#7C8DB5" />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Shimmer effect */}
          {justCompleted && (
            <motion.div
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: "200%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          )}
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 rounded-[24px] border-primary/15 bg-primary/5 relative shadow-sm">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDismiss}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>

        <div className="pr-8">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          {timerActive ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2, 
                    ease: "linear" 
                  }}
                >
                  <Timer className="w-5 h-5 text-primary" />
                </motion.div>
                <motion.span 
                  key={timeLeft}
                  initial={{ scale: 1.2, color: "#7C8DB5" }}
                  animate={{ scale: 1, color: "inherit" }}
                  className="text-[24px] font-semibold"
                >
                  {formatTime(timeLeft)}
                </motion.span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimerActive(false)}
                className="rounded-full"
              >
                Pause
              </Button>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => setTimerActive(true)}
                className="w-full rounded-full"
              >
                {action}
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
