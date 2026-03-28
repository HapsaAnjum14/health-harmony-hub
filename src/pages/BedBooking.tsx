import { useState } from "react";
import { BedDouble, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Bed {
  id: string;
  ward: string;
  type: string;
  status: "Available" | "Occupied" | "Reserved" | "Maintenance";
}

const wards = ["General Ward", "ICU", "Pediatric", "Maternity", "Surgical"];

const initialBeds: Bed[] = [
  ...Array.from({ length: 6 }, (_, i) => ({ id: `GW-${i + 1}`, ward: "General Ward", type: "Standard", status: (i < 3 ? "Occupied" : i < 5 ? "Available" : "Maintenance") as Bed["status"] })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `ICU-${i + 1}`, ward: "ICU", type: "Critical Care", status: (i < 2 ? "Occupied" : "Available") as Bed["status"] })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `PED-${i + 1}`, ward: "Pediatric", type: "Pediatric", status: (i < 1 ? "Occupied" : i < 3 ? "Available" : "Reserved") as Bed["status"] })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `MAT-${i + 1}`, ward: "Maternity", type: "Maternity", status: (i < 2 ? "Occupied" : "Available") as Bed["status"] })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `SUR-${i + 1}`, ward: "Surgical", type: "Post-Op", status: (i < 3 ? "Occupied" : "Available") as Bed["status"] })),
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Available: { color: "border-stat-green bg-stat-green/5", icon: <Check className="h-3 w-3 text-stat-green" /> },
  Occupied: { color: "border-destructive/30 bg-destructive/5", icon: <X className="h-3 w-3 text-destructive" /> },
  Reserved: { color: "border-stat-amber bg-stat-amber/5", icon: <BedDouble className="h-3 w-3 text-stat-amber" /> },
  Maintenance: { color: "border-muted-foreground/30 bg-muted/50", icon: null },
};

export default function BedBooking() {
  const [beds, setBeds] = useState(initialBeds);

  const handleReserve = (bedId: string) => {
    setBeds(beds.map((b) => b.id === bedId ? { ...b, status: "Reserved" as const } : b));
    toast.success(`Bed ${bedId} reserved successfully`);
  };

  const summary = {
    total: beds.length,
    available: beds.filter((b) => b.status === "Available").length,
    occupied: beds.filter((b) => b.status === "Occupied").length,
    reserved: beds.filter((b) => b.status === "Reserved").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bed Booking</h1>
        <p className="text-muted-foreground">View bed availability and reserve beds across wards</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Beds", value: summary.total, cls: "text-foreground" },
          { label: "Available", value: summary.available, cls: "text-stat-green" },
          { label: "Occupied", value: summary.occupied, cls: "text-destructive" },
          { label: "Reserved", value: summary.reserved, cls: "text-stat-amber" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.cls}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {wards.map((ward) => {
        const wardBeds = beds.filter((b) => b.ward === ward);
        return (
          <Card key={ward}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{ward}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {wardBeds.map((bed, i) => {
                  const cfg = statusConfig[bed.status];
                  return (
                    <motion.div
                      key={bed.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className={`border-2 rounded-lg p-3 text-center space-y-1 ${cfg.color}`}
                    >
                      <BedDouble className="h-5 w-5 mx-auto text-muted-foreground" />
                      <p className="text-xs font-bold">{bed.id}</p>
                      <p className="text-[10px] text-muted-foreground">{bed.status}</p>
                      {bed.status === "Available" && (
                        <Button size="sm" variant="outline" className="text-[10px] h-6 px-2 mt-1" onClick={() => handleReserve(bed.id)}>
                          Reserve
                        </Button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
