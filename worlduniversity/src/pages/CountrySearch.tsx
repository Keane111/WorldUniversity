import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryCard from "@/components/country/CountryCard";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Layout from "@/components/layout/Layout";
import type { Country } from "@/types/country";
import { Search, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CountrySearch = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast({
          title: "Error",
          description: "Failed to fetch countries. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, [toast]);

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countries;

    return countries.filter(country => 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.name.official && country.name.official.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (country.capital && country.capital.some(cap => 
        cap.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      country.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countries, searchTerm]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Globe className="h-12 w-12 text-primary" />
              <div className="absolute inset-0 bg-gradient-ocean rounded-full opacity-20 blur-sm" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Search Countries
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carilah negara dari nama, ibu kota, atau daerah mereka.
          </p>
        </div>

        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Search Countries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by country name, capital, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
            {searchTerm && (
              <p className="mt-3 text-sm text-muted-foreground">
                Found {filteredCountries.length} countries matching "{searchTerm}"
              </p>
            )}
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {filteredCountries.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No countries found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm 
                      ? `No countries match "${searchTerm}". Try a different search term.`
                      : "Start typing to search for countries."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CountrySearch;