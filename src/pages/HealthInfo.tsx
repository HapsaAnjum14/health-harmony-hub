import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const articles = [
  { title: "Understanding Diabetes Type 2", category: "Diabetes", summary: "Learn about causes, symptoms, management strategies, and lifestyle changes for Type 2 diabetes.", readTime: "8 min" },
  { title: "Managing Hypertension Naturally", category: "Hypertension", summary: "Discover evidence-based approaches to controlling blood pressure through diet, exercise, and stress management.", readTime: "6 min" },
  { title: "Heart Disease Prevention Guide", category: "Cardiology", summary: "Comprehensive guide to reducing cardiovascular risk through preventive measures and regular monitoring.", readTime: "10 min" },
  { title: "Asthma: Triggers and Treatment", category: "Respiratory", summary: "Identify common asthma triggers and learn about modern treatment options for better control.", readTime: "5 min" },
  { title: "Thyroid Disorders Explained", category: "Endocrinology", summary: "Everything you need to know about hypothyroidism, hyperthyroidism, and thyroid function tests.", readTime: "7 min" },
  { title: "Mental Health Awareness", category: "Psychology", summary: "Understanding anxiety, depression, and the importance of mental health care in overall wellbeing.", readTime: "9 min" },
  { title: "Nutrition for Chronic Conditions", category: "Nutrition", summary: "Dietary recommendations for managing diabetes, heart disease, kidney disease, and other chronic conditions.", readTime: "6 min" },
  { title: "Vaccination Schedule for Adults", category: "Preventive Care", summary: "Complete guide to recommended vaccinations for adults including boosters and travel vaccines.", readTime: "4 min" },
];

const categoryColors: Record<string, string> = {
  Diabetes: "bg-stat-amber/10 text-stat-amber",
  Hypertension: "bg-stat-rose/10 text-stat-rose",
  Cardiology: "bg-destructive/10 text-destructive",
  Respiratory: "bg-stat-blue/10 text-stat-blue",
  Endocrinology: "bg-primary/10 text-primary",
  Psychology: "bg-stat-green/10 text-stat-green",
  Nutrition: "bg-stat-amber/10 text-stat-amber",
  "Preventive Care": "bg-stat-blue/10 text-stat-blue",
};

export default function HealthInfo() {
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Health Information</h1>
        <p className="text-muted-foreground">Access verified medical articles and health resources</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search health topics..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article, i) => (
          <motion.div key={article.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="hover:shadow-elevated transition-shadow cursor-pointer h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[article.category] || "bg-muted text-muted-foreground"}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <CardTitle className="text-sm leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground mb-3">{article.summary}</p>
                <div className="flex items-center gap-1 text-xs text-primary font-medium">
                  <BookOpen className="h-3 w-3" /> Read Article <ExternalLink className="h-3 w-3 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
