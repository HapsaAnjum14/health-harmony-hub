import { Users, CalendarDays, BedDouble, Pill, Activity, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const recentPatients = [
  { name: "Ramesh Kumar", age: 45, condition: "Diabetes Type 2", status: "Active" },
  { name: "Priya Sharma", age: 32, condition: "Hypertension", status: "Monitoring" },
  { name: "Anil Gupta", age: 58, condition: "Cardiac Checkup", status: "Discharged" },
  { name: "Sunita Patel", age: 41, condition: "Asthma", status: "Active" },
];

const upcomingAppointments = [
  { patient: "Vikram Singh", doctor: "Dr. Mehta", time: "10:00 AM", dept: "Cardiology" },
  { patient: "Neha Joshi", doctor: "Dr. Rao", time: "11:30 AM", dept: "Dermatology" },
  { patient: "Arjun Reddy", doctor: "Dr. Kapoor", time: "2:00 PM", dept: "Orthopedics" },
];

const statusColor: Record<string, string> = {
  Active: "bg-stat-green/10 text-stat-green",
  Monitoring: "bg-stat-amber/10 text-stat-amber",
  Discharged: "bg-stat-blue/10 text-stat-blue",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Rajesh. Here's today's overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value="1,284" change="+12% from last month" icon={Users} color="blue" />
        <StatCard title="Appointments Today" value="42" change="8 pending confirmation" icon={CalendarDays} color="green" />
        <StatCard title="Beds Available" value="38 / 120" change="ICU: 4 available" icon={BedDouble} color="amber" />
        <StatCard title="Pharmacy Orders" value="67" change="12 pending delivery" icon={Pill} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Recent Patients</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/patients")}>
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentPatients.map((p) => (
                  <div key={p.name} className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.condition} · Age {p.age}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Upcoming Appointments</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/appointments")}>
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingAppointments.map((a) => (
                  <div key={a.patient} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{a.patient}</p>
                      <p className="text-xs text-muted-foreground">{a.doctor} · {a.dept}</p>
                    </div>
                    <span className="text-xs font-medium text-primary bg-secondary px-2.5 py-1 rounded-full">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Register Patient", icon: Users, to: "/patients" },
                { label: "Book Appointment", icon: CalendarDays, to: "/appointments" },
                { label: "Reserve Bed", icon: BedDouble, to: "/beds" },
                { label: "Order Medicine", icon: Pill, to: "/pharmacy" },
              ].map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto flex-col gap-2 py-4 hover:bg-secondary hover:border-primary/20"
                  onClick={() => navigate(action.to)}
                >
                  <action.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
