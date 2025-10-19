import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onComplete?: (data: CheckInData) => void;
}

export interface CheckInData {
  mood: number;
  energy: number;
  energyHonesty: number;
  notes?: string;
}

const moodEmojis = ["😔", "😕", "😐", "🙂", "😊"];

export function CheckInModal({ open, onClose, onComplete }: CheckInModalProps) {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState([50]);
  const [energyHonesty, setEnergyHonesty] = useState([50]);
  const [notes, setNotes] = useState("");

  const showDissonance = mood >= 3 && energy[0] < 40;

  const handleComplete = () => {
    onComplete?.({
      mood,
      energy: energy[0],
      energyHonesty: energyHonesty[0],
      notes,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[360px] rounded-[28px] p-6 shadow-xl border-border/30">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Morning check-in</DialogTitle>
          <DialogDescription className="sr-only">
            Share how you're feeling today with a quick mood and energy check-in
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Mood */}
          <div>
            <label className="text-sm mb-3 block">How are you feeling?</label>
            <div className="flex justify-between gap-2">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`flex-1 aspect-square rounded-[16px] border-2 transition-all flex items-center justify-center text-2xl shadow-sm ${
                    mood === index + 1
                      ? "border-primary/30 bg-primary/8 scale-105"
                      : "border-border/30 hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div>
            <label className="text-sm mb-3 block">Energy level</label>
            <Slider
              value={energy}
              onValueChange={setEnergy}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Depleted</span>
              <span>Energized</span>
            </div>
          </div>

          {/* Energy Honesty */}
          <div>
            <label className="text-sm mb-3 block">
              How much of your energy feels real?
            </label>
            <Slider
              value={energyHonesty}
              onValueChange={setEnergyHonesty}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Numb/Forcing it</span>
              <span>Genuine</span>
            </div>
          </div>

          {/* Dissonance Banner */}
          {showDissonance && (
            <Alert className="border-[#C9A569]/20 bg-[#C9A569]/5 rounded-[16px] shadow-sm">
              <AlertCircle className="h-4 w-4 text-[#C9A569]" />
              <p className="text-sm ml-2 leading-relaxed">
                You selected 'I'm fine,' but your energy looks low. Want a gentle check-in?
              </p>
            </Alert>
          )}

          {/* Notes */}
          <div>
            <label className="text-sm mb-2 block">
              Anything on your mind? (optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="One honest line..."
              className="rounded-[16px] min-h-[80px] border-border/30 focus:border-primary/30 transition-all"
            />
          </div>

          <Button onClick={handleComplete} className="w-full rounded-full h-11 shadow-sm hover:shadow transition-all">
            Complete check-in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
