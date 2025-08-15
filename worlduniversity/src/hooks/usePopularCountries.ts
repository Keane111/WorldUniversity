import { useEffect, useState } from "react";
import { countryApi } from "@/services/countryApi";
import type { Country } from "@/types/country";

export function usePopularCountries() {
  const [popularCountries, setPopularCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCountries = async () => {
      try {
        const countries = await countryApi.getAllCountries();
        const popular = countries.sort((a, b) => b.population - a.population).slice(0, 8);
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
