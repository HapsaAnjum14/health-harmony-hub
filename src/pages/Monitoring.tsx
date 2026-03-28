import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplets, Heart, Thermometer } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const bloodSugarData = [
  { day: "Mon", level: 140 },
  { day: "Tue", level: 135 },
  { day: "Wed", level: 160 },
  { day: "Thu", level: 145 },
  { day: "Fri", level: 130 },
  { day: "Sat", level: 125 },
  { day: "Sun", level: 138 },
];

const bpData = [
  { day: "Mon", systolic: 130, diastolic: 85 },
  { day: "Tue", systolic: 128, diastolic: 82 },
  { day: "Wed", systolic: 135, diastolic: 88 },
  { day: "Thu", systolic: 132, diastolic: 86 },
  { day: "Fri", systolic: 126, diastolic: 80 },
  { day: "Sat", systolic: 124, diastolic: 78 },
  { day: "Sun", systolic: 129, diastolic: 84 },
];

const patients = [
  { name: "Ramesh Kumar", condition: "Diabetes Type 2", risk: "Moderate", lastReading: "138 mg/dL", trend: "Stable" },
  { name: "Priya Sharma", condition: "Hypertension", risk: "High", lastReading: "142/92 mmHg", trend: "Improving" },
  { name: "Vikram Singh", condition: "COPD", risk: "High", lastReading: "SpO2 93%", trend: "Declining" },
  { name: "Meera Nair", condition: "Thyroid", risk: "Low", lastReading: "TSH 4.2", trend: "Stable" },
];

const riskColor: Record<string, string> = {
  Low: "bg-stat-green/10 text-stat-green",
  Moderate: "bg-stat-amber/10 text-stat-amber",
  High: "bg-destructive/10 text-destructive",
};

const trendColor: Record<string, string> = {
  Stable: "text-stat-blue",
  Improving: "text-stat-green",
  Declining: "text-destructive",
};

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chronic Disease Monitoring</h1>
        <p className="text-muted-foreground">Track vitals and monitor chronic conditions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Heart Rate", value: "72 bpm", icon: Heart, color: "text-stat-rose" },
          { label: "Blood Sugar", value: "138 mg/dL", icon: Droplets, color: "text-stat-amber" },
          { label: "SpO2", value: "97%", icon: Activity, color: "text-stat-blue" },
          { label: "Temperature", value: "98.4°F", icon: Thermometer, color: "text-stat-green" },
        ].map((v, i) => (
          <motion.div key={v.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${v.color}`}>
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{v.label}</p>
                  <p className="text-lg font-bold">{v.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Blood Sugar Trend (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={bloodSugarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="level" stroke="hsl(var(--stat-amber))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Blood Pressure Trend (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={bpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="systolic" stroke="hsl(var(--stat-rose))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--stat-blue))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monitored Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {patients.map((p) => (
              <div key={p.name} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.condition} · Last: {p.lastReading}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${trendColor[p.trend]}`}>{p.trend}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColor[p.risk]}`}>{p.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
