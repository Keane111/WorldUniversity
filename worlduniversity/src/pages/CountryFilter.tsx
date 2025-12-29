import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CountryCard from "@/components/country/CountryCard";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Layout from "@/components/layout/Layout";
import type { Country } from "@/types/country";
import { Filter, RotateCcw, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CountryFilter = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedSubregion, setSelectedSubregion] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [independentOnly, setIndependentOnly] = useState<boolean>(false);
  const [unMemberOnly, setUnMemberOnly] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,languages,independent,cca3"
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

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(countries.map(country => country.region))];
    return uniqueRegions.sort();
  }, [countries]);

  const subregions = useMemo(() => {
    const uniqueSubregions = [...new Set(countries.map(country => country.subregion).filter((subregion): subregion is string => Boolean(subregion)))];
    return uniqueSubregions.sort();
  }, [countries]);

  const languages = useMemo(() => {
    const allLanguages = new Set<string>();
    countries.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(language => {
          allLanguages.add(language);
        });
      }
    });
    return Array.from(allLanguages).sort();
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      if (selectedRegion !== "all" && country.region !== selectedRegion) {
        return false;
      }

      if (selectedSubregion !== "all" && country.subregion !== selectedSubregion) {
        return false;
      }

      if (selectedLanguage !== "all") {
        if (!country.languages || 
            !Object.values(country.languages).includes(selectedLanguage)) {
          return false;
        }
      }

      if (independentOnly && !country.independent) {
        return false;
      }

      if (unMemberOnly && !country.unMember) {
        return false;
      }

      return true;
    });
  }, [countries, selectedRegion, selectedSubregion, selectedLanguage, independentOnly, unMemberOnly]);

  const resetFilters = () => {
    setSelectedRegion("all");
    setSelectedSubregion("all");
    setSelectedLanguage("all");
    setIndependentOnly(false);
    setUnMemberOnly(false);
  };

  const hasActiveFilters = selectedRegion !== "all" || 
                          selectedSubregion !== "all" ||
                          selectedLanguage !== "all" || 
                          independentOnly || 
                          unMemberOnly;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative inline-block">
              <svg className="h-20 w-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="globeGradientFilter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="10" stroke="url(#globeGradientFilter)" strokeWidth="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="url(#globeGradientFilter)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-teal-600 to-green-700 bg-clip-text text-transparent font-heading">
            Filter Countries
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Filter pencarian negara secara spesifik dengan melihat dari benua, bahasa, dll.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-card bg-black border-4 border-black rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-white" />
                    <span>Filters</span>
                  </span>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetFilters}
                      className="text-gray-300 hover:text-white"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-white">Region</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subregion" className="text-white">Subregion</Label>
                  <Select value={selectedSubregion} onValueChange={setSelectedSubregion}>
                    <SelectTrigger id="subregion">
                      <SelectValue placeholder="Select subregion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subregions</SelectItem>
                      {subregions.map(subregion => (
                        <SelectItem key={subregion} value={subregion}>
                          {subregion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="text-white">Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {languages.slice(0, 50).map(language => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="independent" 
                      checked={independentOnly}
                      onCheckedChange={(checked) => setIndependentOnly(checked === true)}
                    />
                    <Label htmlFor="independent" className="text-sm font-medium text-white">
                      Independent countries only
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="unMember" 
                      checked={unMemberOnly}
                      onCheckedChange={(checked) => setUnMemberOnly(checked === true)}
                    />
                    <Label htmlFor="unMember" className="text-sm font-medium text-white">
                      UN members only
                    </Label>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-white">
                    {filteredCountries.length} countries found
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

    
          <div className="lg:col-span-3">
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
                      <p className="text-muted-foreground mb-6">
                        No countries match your current filters. Try adjusting your criteria.
                      </p>
                      <Button onClick={resetFilters} variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        </div>
      </div>
    </Layout>
  );
};

export default CountryFilter;