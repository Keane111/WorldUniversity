import { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgClass: string;
  bgImage?: string;
}

export default function FeatureCard({ icon, title, description, bgClass, bgImage }: FeatureCardProps) {
  return (
    <div className="group hover:shadow-hover transition-all duration-500 border-0 shadow-card overflow-hidden rounded-xl relative min-h-[300px]">
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="p-8 relative z-20">
        <div className={`absolute top-0 right-0 w-32 h-32 ${bgClass} opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
        <div className="relative">
          <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
