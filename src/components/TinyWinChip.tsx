import { Check, Sun, MessageCircle, Droplet, Wind, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface TinyWinChipProps {
  label: string;
  icon?: "sun" | "message" | "droplet" | "wind";
  variant: "completed" | "suggested" | "disabled";
  onClick?: () => void;
}

const iconMap = {
  sun: Sun,
  message: MessageCircle,
  droplet: Droplet,
  wind: Wind,
};

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  angle: number;
}

export function TinyWinChip({ label, icon, variant, onClick }: TinyWinChipProps) {
  const Icon = icon ? iconMap[icon] : null;
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [justCompleted, setJustCompleted] = useState(false);

  // Generate confetti particles
  const generateParticles = () => {
    const colors = ["#8BA899", "#D4A574", "#7C8DB5", "#9BA1AE"];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: i * 0.02,
        angle: (360 / 12) * i,
      });
    }
    
    return newParticles;
  };

  const handleClick = () => {
    if (onClick) {
      setShowCelebration(true);
      setParticles(generateParticles());
      setJustCompleted(true);
      onClick();

      setTimeout(() => {
        setShowCelebration(false);
      }, 800);
    }
  };

  useEffect(() => {
    if (variant === "completed" && justCompleted) {
      const timer = setTimeout(() => setJustCompleted(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [variant, justCompleted]);

  if (variant === "completed") {
    return (
      <motion.div
        initial={justCompleted ? { scale: 0.8, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 25,
          duration: 0.6 
        }}
        className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#8BA899]/10 border border-[#8BA899]/15 shadow-sm"
      >
        <motion.div
          initial={justCompleted ? { scale: 0, rotate: -180 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 15,
            delay: 0.1 
          }}
        >
          <Check className="w-4 h-4 text-[#8BA899]" />
        </motion.div>
        <span className="text-sm text-[#8BA899]">{label}</span>
        
        {/* Glow effect */}
        {justCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-full bg-[#8BA899]/20 blur-md -z-10"
          />
        )}
      </motion.div>
    );
  }

  if (variant === "disabled") {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted opacity-50">
        {Icon && <Icon className="w-4 h-4" />}
        <span className="text-sm">{label}</span>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <Button
        onClick={handleClick}
        variant="outline"
        className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-primary/15 hover:bg-primary/8 h-auto shadow-sm hover:shadow transition-all overflow-visible"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {Icon && <Icon className="w-4 h-4 text-primary" />}
        </motion.div>
        <span className="text-sm">{label}</span>
        <motion.div
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut" 
          }}
        >
          <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-60" />
        </motion.div>
      </Button>

      {/* Celebration Effects */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {/* Confetti Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ 
                  scale: 0, 
                  x: 0, 
                  y: 0,
                  opacity: 1,
                  rotate: 0 
                }}
                animate={{ 
                  scale: [0, 1, 0.8, 0],
                  x: Math.cos(particle.angle * Math.PI / 180) * 80,
                  y: Math.sin(particle.angle * Math.PI / 180) * 80,
                  opacity: [1, 1, 0.8, 0],
                  rotate: 360
                }}
                transition={{ 
                  duration: 0.8,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                style={{ 
                  backgroundColor: particle.color,
                  boxShadow: `0 0 4px ${particle.color}`
                }}
              />
            ))}

            {/* Sparkle Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 1, 0],
                y: -40
              }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <Sparkles className="w-6 h-6 text-[#D4A574]" fill="#D4A574" />
            </motion.div>

            {/* Ripple Effect */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ 
                scale: 2.5,
                opacity: 0
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
            />
            
            {/* Second Ripple */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.3 }}
              animate={{ 
                scale: 3,
                opacity: 0
              }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute inset-0 rounded-full border-2 border-primary/50 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
