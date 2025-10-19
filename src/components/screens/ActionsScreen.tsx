import { useState } from "react";
import { TinyWinChip } from "../TinyWinChip";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Sun, Droplet, Wind, MessageCircle, Footprints, Heart, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

interface ActionsScreenProps {
  onComplete?: (action: string) => void;
}

export function ActionsScreen({ onComplete }: ActionsScreenProps) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const actionCategories = [
    {
      title: "Light & Energy",
      icon: Sun,
      color: "#D4A574",
      actions: [
        { id: "sunlight-2", label: "Sunlight break (2 min)", icon: "sun" as const },
        { id: "window", label: "Face a window", icon: "sun" as const },
        { id: "outside", label: "Step outside", icon: "sun" as const },
      ],
    },
    {
      title: "Grounding",
      icon: Wind,
      color: "#8BA899",
      actions: [
        { id: "breathe-3", label: "3 breaths", icon: "wind" as const },
        { id: "breathe-box", label: "Box breathing (1 min)", icon: "wind" as const },
        { id: "pause", label: "Pause & notice 5 things", icon: "wind" as const },
      ],
    },
    {
      title: "Connection",
      icon: MessageCircle,
      color: "#7C8DB5",
      actions: [
        { id: "text-honest", label: "Text one honest line", icon: "message" as const },
        { id: "voice-note", label: "Send a voice note", icon: "message" as const },
        { id: "check-friend", label: "Check in with someone", icon: "message" as const },
      ],
    },
    {
      title: "Body",
      icon: Droplet,
      color: "#9BA1AE",
      actions: [
        { id: "water", label: "Sip water", icon: "droplet" as const },
        { id: "stretch", label: "30-second stretch", icon: "droplet" as const },
        { id: "walk-5", label: "5-minute walk", icon: "droplet" as const },
      ],
    },
  ];

  const handleActionComplete = (id: string, label: string) => {
    setCompletedActions((prev) => new Set(prev).add(id));
    onComplete?.(label);
    
    // Show celebration toast
    const messages = [
      "Beautiful! You're taking care of yourself 🌿",
      "That's a win! Keep going 💚",
      "You did it! Small steps matter ✨",
      "Well done! Your rhythm is building 🎯",
      "Nice work! That took courage 💪"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    toast.success(randomMessage, {
      duration: 3000,
      style: {
        background: 'var(--rhythm-surface)',
        border: '1px solid rgba(139, 168, 153, 0.2)',
        borderRadius: '20px',
      },
    });
  };

  const totalCompleted = completedActions.size;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-[28px] font-semibold mb-1">Tiny Wins</h1>
        <p className="text-sm text-muted-foreground">
          30–90 second actions that build momentum
        </p>
      </div>

      {/* Today's Progress */}
      <div className="px-6 mb-6">
        <Card className="p-5 rounded-[24px] bg-gradient-to-br from-primary/5 to-transparent shadow-sm border-primary/10">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-sm relative overflow-hidden"
              animate={totalCompleted > 0 ? { 
                boxShadow: [
                  "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  "0 0 15px rgba(124, 141, 181, 0.3)",
                  "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                ]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                key={totalCompleted}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-[24px] font-semibold text-primary"
              >
                {totalCompleted}
              </motion.span>
              
              {totalCompleted > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                />
              )}
            </motion.div>
            <div className="flex-1">
              <div className="font-semibold mb-1">Wins today</div>
              <motion.p 
                key={totalCompleted}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-muted-foreground"
              >
                {totalCompleted === 0
                  ? "Start with just one"
                  : totalCompleted < 3
                  ? "You're building momentum!"
                  : "Amazing consistency!"}
              </motion.p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Categories */}
      <div className="px-6 space-y-6">
        {actionCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title}>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: category.color }} />
                </div>
                <h2 className="text-[20px] font-semibold">{category.title}</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.actions.map((action) => (
                  <TinyWinChip
                    key={action.id}
                    label={action.label}
                    icon={action.icon}
                    variant={
                      completedActions.has(action.id) ? "completed" : "suggested"
                    }
                    onClick={() => handleActionComplete(action.id, action.label)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Timer */}
      <div className="px-6 mt-6">
        <Card className="p-4 rounded-[24px] border-primary/15 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Need a timer?</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              2 min
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
