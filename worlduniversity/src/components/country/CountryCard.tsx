import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { Country } from "@/types/country";
import { MapPin, Users, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
  className?: string;
}

const CountryCard = ({ country, className }: CountryCardProps) => {
  const formatPopulation = (population: number) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)}K`;
    }
    return population.toString();
  };

  return (
    <Link to={`/country/${encodeURIComponent(country.name.common)}`}>
      <Card className={cn(
        "bg-white border-2 border-blue-100 rounded-xl overflow-hidden",
        "group cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "hover:border-blue-300 hover:bg-blue-50",
        className
      )}>
        <div className="aspect-[3/2] relative overflow-hidden bg-blue-50">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xl leading-tight line-clamp-1 text-teal-700 group-hover:text-teal-600 transition-colors">
                {country.name.common}
              </h3>
              <p className="text-sm text-blue-500 line-clamp-1 mt-1">
                {country.name.official}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              {country.capital && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="line-clamp-1">{country.capital[0]}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>{formatPopulation(country.population)} people</span>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <Globe2 className="h-4 w-4 text-primary" />
                <span className="line-clamp-1">{country.region}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;