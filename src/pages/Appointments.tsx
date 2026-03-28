import { useState } from "react";
import { Plus, Clock, User, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}

const initialAppointments: Appointment[] = [
  { id: "A001", patient: "Vikram Singh", doctor: "Dr. Mehta", department: "Cardiology", date: "2026-03-28", time: "10:00 AM", status: "Scheduled" },
  { id: "A002", patient: "Neha Joshi", doctor: "Dr. Rao", department: "Dermatology", date: "2026-03-28", time: "11:30 AM", status: "Scheduled" },
  { id: "A003", patient: "Arjun Reddy", doctor: "Dr. Kapoor", department: "Orthopedics", date: "2026-03-28", time: "2:00 PM", status: "In Progress" },
  { id: "A004", patient: "Ramesh Kumar", doctor: "Dr. Patel", department: "Endocrinology", date: "2026-03-28", time: "3:30 PM", status: "Scheduled" },
  { id: "A005", patient: "Priya Sharma", doctor: "Dr. Gupta", department: "General Medicine", date: "2026-03-27", time: "9:00 AM", status: "Completed" },
  { id: "A006", patient: "Sunita Patel", doctor: "Dr. Desai", department: "Pulmonology", date: "2026-03-27", time: "11:00 AM", status: "Completed" },
];

const statusStyle: Record<string, string> = {
  Scheduled: "bg-stat-blue/10 text-stat-blue",
  "In Progress": "bg-stat-amber/10 text-stat-amber",
  Completed: "bg-stat-green/10 text-stat-green",
  Cancelled: "bg-destructive/10 text-destructive",
};

const departments = ["Cardiology", "Dermatology", "Orthopedics", "Endocrinology", "General Medicine", "Pulmonology", "Neurology", "Pediatrics"];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ patient: "", doctor: "", department: "Cardiology", date: "", time: "" });

  const handleAdd = () => {
    if (!form.patient || !form.doctor || !form.date || !form.time) return;
    const a: Appointment = {
      id: `A${String(appointments.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Scheduled",
    };
    setAppointments([a, ...appointments]);
    setForm({ patient: "", doctor: "", department: "Cardiology", date: "", time: "" });
    setDialogOpen(false);
  };

  const todayAppts = appointments.filter((a) => a.date === "2026-03-28");
  const pastAppts = appointments.filter((a) => a.date !== "2026-03-28");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage doctor appointments</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-none text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" /> Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Input value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <Button onClick={handleAdd} className="gradient-primary border-none text-primary-foreground">Book Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Today's Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayAppts.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[a.status]}`}>{a.status}</span>
                    <span className="text-xs text-muted-foreground font-mono">{a.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{a.patient}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{a.doctor} · {a.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-primary font-medium">{a.time}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {pastAppts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Past Appointments</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {pastAppts.map((a) => (
                  <div key={a.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{a.patient}</p>
                        <p className="text-xs text-muted-foreground">{a.doctor} · {a.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{a.date}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[a.status]}`}>{a.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
