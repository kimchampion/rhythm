import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface PatternChartProps {
  title: string;
  data: Array<{ day: string; value: number }>;
  unit: string;
  color?: string;
  goal?: number;
}

export function PatternChart({
  title,
  data,
  unit,
  color = "#335CFF",
  goal,
}: PatternChartProps) {
  return (
    <Card className="p-5 rounded-[24px] shadow-sm border-border/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">{title}</h4>
        {goal && (
          <span className="text-sm text-muted-foreground">Goal: {goal} {unit}</span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--rhythm-ink-muted)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--rhythm-ink-muted)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--rhythm-surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              fontSize: "14px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value} ${unit}`, title]}
          />
          <Bar dataKey="value" fill={color} radius={[12, 12, 0, 0]} opacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
