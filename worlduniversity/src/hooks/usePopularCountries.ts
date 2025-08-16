import { useEffect, useState } from "react";
import type { Country } from "@/types/country";

export function usePopularCountries() {
  const [popularCountries, setPopularCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
        );
        const countries = await response.json();
        const popular = countries.sort((a: Country, b: Country) => b.population - a.population).slice(0, 8);
        setPopularCountries(popular);
      } catch (error) {
        setError("Error fetching countries");
      } finally {
        setLoading(false);
      }
    };
    fetchPopularCountries();
  }, []);

  return { popularCountries, loading, error };
}
