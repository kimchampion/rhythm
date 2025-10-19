import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import {
  Shield,
  Download,
  Trash2,
  Moon,
  Bell,
  Activity,
  Phone,
  ChevronRight,
} from "lucide-react";

interface SettingsScreenProps {
  onCrisisSheet?: () => void;
}

export function SettingsScreen({ onCrisisSheet }: SettingsScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-[28px] font-semibold mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your Rhythm experience</p>
      </div>

      {/* Focus Area */}
      <div className="px-6 mb-6">
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Current focus</h3>
        <button className="w-full p-4 rounded-[24px] bg-card border border-border/30 hover:border-primary/30 transition-all flex items-center justify-between shadow-sm hover:shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">General wellness</div>
              <div className="text-sm text-muted-foreground">Build daily rhythms</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Data Permissions */}
      <div className="px-6 mb-6">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Data permissions</h3>
        <Card className="rounded-[24px] divide-y shadow-sm border-border/30">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Sleep data</span>
            </div>
            <Switch />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Movement & steps</span>
            </div>
            <Switch />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>
      </div>

      {/* Privacy & Data */}
      <div className="px-6 mb-6">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Privacy & data</h3>
        <div className="space-y-2">
          <button className="w-full p-4 rounded-[24px] bg-card border border-border/30 hover:border-primary/30 transition-all flex items-center justify-between shadow-sm hover:shadow">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Export my data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full p-4 rounded-[24px] bg-card border border-border/30 hover:border-destructive/30 transition-all flex items-center justify-between shadow-sm hover:shadow">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-destructive" />
              <span className="text-sm text-destructive">Delete account</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="px-6 mb-6">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Crisis support</h3>
        <button
          onClick={onCrisisSheet}
          className="w-full p-4 rounded-[24px] bg-[#C17B7B]/5 border border-[#C17B7B]/15 hover:border-[#C17B7B]/30 transition-all flex items-center justify-between shadow-sm hover:shadow"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#C17B7B]" />
            <span className="text-sm">Emergency helplines</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Disclaimers */}
      <div className="px-6">
        <Card className="p-4 rounded-[24px] bg-muted/20 border-border/30 shadow-sm">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-2">
              <p>
                <strong>Important:</strong> Rhythm is not a medical device and does not diagnose,
                treat, or prevent any medical condition.
              </p>
              <p>
                If you're experiencing a mental health crisis, please contact emergency services or
                a crisis helpline immediately.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
