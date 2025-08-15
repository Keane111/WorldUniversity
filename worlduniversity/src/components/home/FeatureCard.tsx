import { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgClass: string;
}

export default function FeatureCard({ icon, title, description, bgClass }: FeatureCardProps) {
  return (
    <div className="group hover:shadow-hover transition-all duration-500 border-0 shadow-card overflow-hidden">
      <div className="p-8 relative">
        <div className={`absolute top-0 right-0 w-32 h-32 ${bgClass} opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
        <div className="relative">
          <div className={`w-20 h-20 ${bgClass} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
