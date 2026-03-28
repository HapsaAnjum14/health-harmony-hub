import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "rose";
}

const colorMap = {
  blue: "bg-stat-blue/10 text-stat-blue",
  green: "bg-stat-green/10 text-stat-green",
  amber: "bg-stat-amber/10 text-stat-amber",
  rose: "bg-stat-rose/10 text-stat-rose",
};

export function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-card p-5 shadow-card border"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{change}</p>
    </motion.div>
  );
}
