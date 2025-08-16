import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Layout from "@/components/layout/Layout";
import type { Country } from "@/types/country";
import { 
  ArrowLeft, MapPin, Users, Globe2, Landmark, 
  DollarSign, Languages, Map, ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CountryDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (!name) return;

      try {
        setLoading(true);
        setError(null);
        const countryName = (name as string).replace(/-/g, " ");
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=false`);

        if (!response.ok) {
          throw new Error("Country not found");
        }

        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
        setError("Failed to load country details");
        toast({
          title: "Error",
          description: "Failed to fetch country information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [name, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-32">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!country && error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-16">
            <CardContent>
              <Globe2 className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Error Loading Country</h3>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>
              <Link to="/">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-16">
            <CardContent>
              <Globe2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Country not found</h3>
              <p className="text-muted-foreground mb-6">
                The country you're looking for doesn't exist or couldn't be loaded.
              </p>
              <Button asChild>
                <Link to="/search">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} km²`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">



        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/search">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Link>
          </Button>
        </div>




        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {country.name.common}
              </h1>
              <p className="text-xl text-muted-foreground">
                {country.name.official}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">{country.region}</Badge>
                {country.subregion && (
                  <Badge variant="outline">{country.subregion}</Badge>
                )}
                {country.independent && (
                  <Badge className="bg-green-500 text-white">Independent</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <img
                src={country.flags.svg || country.flags.png}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className="w-full max-w-sm h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>
          </div>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Capital & Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {country.capital && (
                <div>
                  <p className="text-sm text-muted-foreground">Capital</p>
                  <p className="font-semibold">{country.capital.join(", ")}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Region</p>
                <p className="font-semibold">{country.region}</p>
              </div>
              {country.subregion && (
                <div>
                  <p className="text-sm text-muted-foreground">Subregion</p>
                  <p className="font-semibold">{country.subregion}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                <span>Demographics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Population</p>
                <p className="font-semibold">{formatPopulation(country.population)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="font-semibold">{formatArea(country.area)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landlocked</p>
                <p className="font-semibold">{country.landlocked ? "Yes" : "No"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Landmark className="h-5 w-5 text-primary" />
                <span>Government</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold capitalize">{country.status.replace("-", " ")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">UN Member</p>
                <p className="font-semibold">{country.unMember ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Independent</p>
                <p className="font-semibold">{country.independent ? "Yes" : "No"}</p>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {country.currencies && (
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Currencies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(country.currencies).map(([code, currency]) => (
                    <div key={code} className="flex justify-between items-center">
                      <span className="font-semibold">{currency.name}</span>
                      <div className="text-right">
                        <Badge variant="outline">{code}</Badge>
                        {currency.symbol && (
                          <span className="ml-2 text-muted-foreground">{currency.symbol}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {country.languages && (
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Languages className="h-5 w-5 text-primary" />
                  <span>Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.values(country.languages).map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>


        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Map className="h-5 w-5 text-primary" />
              <span>Maps & Links</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto p-4">
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full"
                >
                  <div className="text-left">
                    <p className="font-semibold">Google Maps</p>
                    <p className="text-sm text-muted-foreground">View on Google Maps</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4">
                <a 
                  href={country.maps.openStreetMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full"
                >
                  <div className="text-left">
                    <p className="font-semibold">OpenStreetMap</p>
                    <p className="text-sm text-muted-foreground">View on OpenStreetMap</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CountryDetail;