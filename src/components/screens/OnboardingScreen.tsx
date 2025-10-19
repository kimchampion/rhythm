import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, Shield, Heart, Sun, Baby, Activity } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: (focus: string) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [selectedFocus, setSelectedFocus] = useState<string>("");

  const slides = [
    {
      icon: Heart,
      title: "Welcome to Rhythm",
      description:
        "Prevent mood dips by aligning your daily rhythms — sleep, light, movement, and connection — with tiny, low-effort actions.",
      action: "Get started",
    },
    {
      icon: Shield,
      title: "Privacy first, always",
      description:
        "Your data stays on your device unless you choose to share. No tracking, no selling, no judgment. Rhythm is a tool for you, not for us.",
      action: "I understand",
    },
  ];

  const focusOptions = [
    {
      id: "general",
      icon: Activity,
      title: "General wellness",
      description: "Build daily rhythms for mood stability",
    },
    {
      id: "seasonal",
      icon: Sun,
      title: "Seasonal patterns",
      description: "Prevent SAD with light and rhythm",
    },
    {
      id: "postpartum",
      icon: Baby,
      title: "Postpartum support",
      description: "Navigate the transition with care",
    },
    {
      id: "bipolar",
      icon: Activity,
      title: "Bipolar early-signs",
      description: "Catch subtle shifts before they grow",
    },
  ];

  if (step < slides.length) {
    const slide = slides[step];
    const Icon = slide.icon;

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Icon className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-[28px] font-semibold mb-4 leading-snug">{slide.title}</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed opacity-90">
            {slide.description}
          </p>

          <Button
            onClick={() => setStep(step + 1)}
            className="w-full rounded-full h-12 shadow-sm hover:shadow transition-all"
          >
            {slide.action}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="flex gap-2 justify-center mt-6">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-8 bg-primary" : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 pt-12">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        <h1 className="text-[28px] font-semibold mb-2">Choose your focus</h1>
        <p className="text-muted-foreground mb-6">
          You can always change this later in settings
        </p>

        <div className="grid gap-3 flex-1">
          {focusOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedFocus === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setSelectedFocus(option.id)}
                className={`p-4 rounded-[24px] border-2 transition-all text-left shadow-sm ${
                  isSelected
                    ? "border-primary/30 bg-primary/8 shadow"
                    : "border-border/30 hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "bg-primary/8" : "bg-muted/50"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{option.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Button
          onClick={() => onComplete(selectedFocus)}
          disabled={!selectedFocus}
          className="w-full rounded-full h-12 mt-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
