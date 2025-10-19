import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Baby, Heart, AlertCircle, BookOpen, Users } from "lucide-react";

export function PostpartumScreen() {
  const screeningTimeline = [
    { week: "Week 2", status: "upcoming", screening: "Initial check-in" },
    { week: "Week 6", status: "due-soon", screening: "EPDS screening" },
    { week: "Week 12", status: "scheduled", screening: "Follow-up" },
  ];

  const partnerTips = [
    {
      do: "Listen without trying to fix",
      dont: "Say 'It's just baby blues'",
    },
    {
      do: "Offer specific help (dishes, holding baby)",
      dont: "Ask 'What can I do to help?'",
    },
    {
      do: "Validate their feelings",
      dont: "Compare to other parents",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-[28px] font-semibold">Postpartum Support</h1>
            <p className="text-sm text-muted-foreground">You're doing great</p>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-[24px] bg-[#C17B7B]/5 border-[#C17B7B]/15 shadow-sm">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#C17B7B] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">When to seek help immediately:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Thoughts of harming yourself or baby</li>
                <li>• Unable to care for yourself or baby</li>
                <li>• Severe anxiety or panic attacks</li>
                <li>• Hallucinations or confusion</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Screening Timeline */}
      <div className="px-6 mb-6">
        <h2 className="text-[20px] font-semibold mb-3">Check-in timeline</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Staged screenings help catch PPD early
        </p>
        <div className="space-y-3">
          {screeningTimeline.map((item, index) => (
            <Card
              key={index}
              className={`p-4 rounded-[24px] shadow-sm ${
                item.status === "due-soon"
                  ? "border-[#C9A569]/20 bg-[#C9A569]/5"
                  : "border-border/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.week}</div>
                  <div className="text-sm text-muted-foreground">{item.screening}</div>
                </div>
                {item.status === "due-soon" && (
                  <Badge className="bg-[#C9A569]/10 text-[#C9A569] border-0">
                    Due soon
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Partner Tips */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-[20px] font-semibold">For partners & support people</h2>
        </div>
        <div className="space-y-3">
          {partnerTips.map((tip, index) => (
            <Card key={index} className="p-4 rounded-[24px] shadow-sm border-border/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[#8BA899] font-medium mb-1 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    What helps
                  </div>
                  <p className="text-sm">{tip.do}</p>
                </div>
                <div>
                  <div className="text-xs text-[#C17B7B] font-medium mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Avoid
                  </div>
                  <p className="text-sm">{tip.dont}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="px-6">
        <h2 className="text-[20px] font-semibold mb-3">What to do if...</h2>
        <div className="space-y-2">
          <button className="w-full p-4 rounded-[24px] bg-card border border-border/30 hover:border-primary/30 transition-all flex items-center gap-3 text-left shadow-sm hover:shadow">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">I'm feeling overwhelmed</span>
          </button>
          <button className="w-full p-4 rounded-[24px] bg-card border border-border/30 hover:border-primary/30 transition-all flex items-center gap-3 text-left shadow-sm hover:shadow">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">I can't bond with my baby</span>
          </button>
          <button className="w-full p-4 rounded-[24px] bg-card border border-border/30 hover:border-primary/30 transition-all flex items-center gap-3 text-left shadow-sm hover:shadow">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">I'm having intrusive thoughts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
