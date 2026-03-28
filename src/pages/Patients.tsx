import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: string;
  lastVisit: string;
  allergies: string;
  phone: string;
}

const initialPatients: Patient[] = [
  { id: "P001", name: "Ramesh Kumar", age: 45, gender: "Male", condition: "Diabetes Type 2", status: "Active", lastVisit: "2026-03-25", allergies: "Penicillin", phone: "+91 98765 43210" },
  { id: "P002", name: "Priya Sharma", age: 32, gender: "Female", condition: "Hypertension", status: "Monitoring", lastVisit: "2026-03-20", allergies: "None", phone: "+91 87654 32109" },
  { id: "P003", name: "Anil Gupta", age: 58, gender: "Male", condition: "Cardiac Arrhythmia", status: "Discharged", lastVisit: "2026-03-18", allergies: "Sulfa drugs", phone: "+91 76543 21098" },
  { id: "P004", name: "Sunita Patel", age: 41, gender: "Female", condition: "Asthma", status: "Active", lastVisit: "2026-03-27", allergies: "Aspirin", phone: "+91 65432 10987" },
  { id: "P005", name: "Vikram Singh", age: 63, gender: "Male", condition: "COPD", status: "Active", lastVisit: "2026-03-26", allergies: "None", phone: "+91 54321 09876" },
  { id: "P006", name: "Meera Nair", age: 29, gender: "Female", condition: "Thyroid Disorder", status: "Monitoring", lastVisit: "2026-03-22", allergies: "Iodine", phone: "+91 43210 98765" },
];

const statusColor: Record<string, string> = {
  Active: "bg-stat-green/10 text-stat-green",
  Monitoring: "bg-stat-amber/10 text-stat-amber",
  Discharged: "bg-stat-blue/10 text-stat-blue",
};

export default function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = patients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "Male", condition: "", allergies: "", phone: "" });

  const handleAdd = () => {
    if (!newPatient.name || !newPatient.age) return;
    const p: Patient = {
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      condition: newPatient.condition || "General Checkup",
      status: "Active",
      lastVisit: new Date().toISOString().split("T")[0],
      allergies: newPatient.allergies || "None",
      phone: newPatient.phone,
    };
    setPatients([p, ...patients]);
    setNewPatient({ name: "", age: "", gender: "Male", condition: "", allergies: "", phone: "" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">Manage patient records and medical history</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-none text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" /> Register Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input type="number" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={newPatient.gender} onValueChange={(v) => setNewPatient({ ...newPatient, gender: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Input value={newPatient.condition} onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Allergies</Label>
                <Input value={newPatient.allergies} onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })} />
              </div>
              <Button onClick={handleAdd} className="gradient-primary border-none text-primary-foreground">Register</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="h-3 w-3 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Monitoring">Monitoring</SelectItem>
            <SelectItem value="Discharged">Discharged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Patient</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Condition</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Allergies</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Last Visit</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b last:border-0 hover:bg-muted/20 cursor-pointer"
                  >
                    <td className="p-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.gender}, {p.age}y</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{p.condition}</td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">{p.allergies}</td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">{p.lastVisit}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>{p.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
