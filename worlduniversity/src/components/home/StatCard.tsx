import { type ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export default function StatCard({ icon, value, label, className }: StatCardProps) {
  return (
    <div className={`text-center group ${className ?? ""}`}>
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-2">{value}</h3>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}
