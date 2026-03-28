import { useState } from "react";
import { Pill, ShoppingCart, Truck, Check, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  prescription: boolean;
}

const medicines: Medicine[] = [
  { id: "M001", name: "Metformin 500mg", category: "Diabetes", price: 120, stock: 250, prescription: true },
  { id: "M002", name: "Amlodipine 5mg", category: "Hypertension", price: 85, stock: 180, prescription: true },
  { id: "M003", name: "Paracetamol 650mg", category: "Pain Relief", price: 30, stock: 500, prescription: false },
  { id: "M004", name: "Salbutamol Inhaler", category: "Respiratory", price: 250, stock: 75, prescription: true },
  { id: "M005", name: "Omeprazole 20mg", category: "Gastric", price: 60, stock: 320, prescription: false },
  { id: "M006", name: "Atorvastatin 10mg", category: "Cholesterol", price: 95, stock: 200, prescription: true },
  { id: "M007", name: "Cetirizine 10mg", category: "Allergy", price: 25, stock: 400, prescription: false },
  { id: "M008", name: "Amoxicillin 500mg", category: "Antibiotic", price: 110, stock: 150, prescription: true },
];

interface Order {
  id: string;
  medicine: string;
  patient: string;
  status: "Processing" | "Dispatched" | "Delivered";
  date: string;
}

const initialOrders: Order[] = [
  { id: "ORD001", medicine: "Metformin 500mg", patient: "Ramesh Kumar", status: "Dispatched", date: "2026-03-28" },
  { id: "ORD002", medicine: "Amlodipine 5mg", patient: "Priya Sharma", status: "Delivered", date: "2026-03-27" },
  { id: "ORD003", medicine: "Salbutamol Inhaler", patient: "Sunita Patel", status: "Processing", date: "2026-03-28" },
];

const orderStatusStyle: Record<string, string> = {
  Processing: "bg-stat-amber/10 text-stat-amber",
  Dispatched: "bg-stat-blue/10 text-stat-blue",
  Delivered: "bg-stat-green/10 text-stat-green",
};

export default function Pharmacy() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [cart, setCart] = useState<string[]>([]);

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (med: Medicine) => {
    if (cart.includes(med.id)) return;
    setCart([...cart, med.id]);
    toast.success(`${med.name} added to cart`);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrders = cart.map((id, i) => {
      const med = medicines.find((m) => m.id === id)!;
      return {
        id: `ORD${String(orders.length + i + 1).padStart(3, "0")}`,
        medicine: med.name,
        patient: "Current Patient",
        status: "Processing" as const,
        date: "2026-03-28",
      };
    });
    setOrders([...newOrders, ...orders]);
    setCart([]);
    toast.success("Order placed successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pharmacy</h1>
          <p className="text-muted-foreground">Order medicines and track deliveries</p>
        </div>
        {cart.length > 0 && (
          <Button onClick={placeOrder} className="gradient-primary border-none text-primary-foreground">
            <ShoppingCart className="mr-2 h-4 w-4" /> Place Order ({cart.length})
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search medicines..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((med, i) => (
          <motion.div key={med.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-elevated transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{med.category}</span>
                  {med.prescription && <span className="text-[10px] text-destructive font-medium">Rx Required</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{med.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">₹{med.price}</span>
                  <span className="text-xs text-muted-foreground">Stock: {med.stock}</span>
                </div>
                <Button
                  size="sm"
                  variant={cart.includes(med.id) ? "secondary" : "outline"}
                  className="w-full"
                  onClick={() => addToCart(med)}
                  disabled={cart.includes(med.id)}
                >
                  {cart.includes(med.id) ? <><Check className="mr-1 h-3 w-3" /> Added</> : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" /> Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <p className="text-sm font-medium">{o.medicine}</p>
                  <p className="text-xs text-muted-foreground">{o.patient} · {o.date}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderStatusStyle[o.status]}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
