import { useState } from "react";
import { SupportLoopTile } from "../SupportLoopTile";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Plus, MessageCircle, Shield } from "lucide-react";

export function SupportLoopScreen() {
  const [contacts] = useState([
    { id: "1", name: "Sarah", relationship: "Partner" },
    { id: "2", name: "Alex", relationship: "Close friend" },
  ]);

  const messageTemplates = [
    "I'm having a rough day and could use someone to talk to",
    "Could we catch up soon? I'd appreciate the connection",
    "Feeling off today — would love to hear your voice",
  ];

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-[28px] font-semibold mb-1">Support Loop</h1>
        <p className="text-sm text-muted-foreground">
          Connect with trusted people in your life
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-[24px] bg-muted/20 border-border/30 shadow-sm">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Support nudges don't share any health data — just a gentle reminder for them to check in
            </p>
          </div>
        </Card>
      </div>

      {/* Support Contacts */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[20px] font-semibold">Your people</h2>
          <Button size="sm" variant="outline" className="rounded-full">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {contacts.map((contact) => (
            <SupportLoopTile
              key={contact.id}
              name={contact.name}
              relationship={contact.relationship}
            />
          ))}
        </div>
      </div>

      {/* Message Templates */}
      <div className="px-6">
        <h2 className="text-[20px] font-semibold mb-3">Message ideas</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Sample messages you can customize and send
        </p>

        <div className="space-y-2">
          {messageTemplates.map((template, index) => (
            <button
              key={index}
              className="w-full p-4 rounded-[24px] bg-muted/20 hover:bg-muted/30 transition-all text-left shadow-sm hover:shadow border border-border/20"
            >
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm flex-1">{template}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
