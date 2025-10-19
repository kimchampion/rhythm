import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface DissonanceCardProps {
  message: string;
  suggestion: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export function DissonanceCard({
  message,
  suggestion,
  onAction,
  onDismiss,
}: DissonanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 rounded-[24px] bg-[#C9A569]/5 border-[#C9A569]/15 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <motion.div 
            className="w-10 h-10 rounded-full bg-[#C9A569]/15 flex items-center justify-center flex-shrink-0"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <AlertCircle className="w-5 h-5 text-[#C9A569]" />
          </motion.div>
          <div className="flex-1">
            <div className="font-semibold mb-1">We noticed something</div>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>

        <motion.div 
          className="p-4 bg-background rounded-[16px] mb-3"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-2 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            </motion.div>
            <p className="text-sm">{suggestion}</p>
          </div>
        </motion.div>

        <div className="flex gap-2">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onAction}
              className="w-full rounded-full"
            >
              Try this
            </Button>
          </motion.div>
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onDismiss}
              variant="ghost"
              className="w-full rounded-full"
            >
              Not now
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
