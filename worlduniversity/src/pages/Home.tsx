import { useEffect, useState } from "react";
import StatCard from "../components/home/StatCard";
import FeatureCard from "../components/home/FeatureCard";
import { usePopularCountries } from "../hooks/usePopularCountries";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CountryCard from "@/components/country/CountryCard";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Layout from "@/components/layout/Layout";
import type { Country } from "@/types/country";
import { Search, Filter, Globe, TrendingUp, MapPin, Users, Award, Compass } from "lucide-react";

const TOTAL_COUNTRIES = 195;
const TOTAL_POPULATION = "7.9B";
const TOTAL_LANGUAGES = "7000+";
const TOTAL_CURRENCIES = 180;

const Home = () => {
  const { popularCountries, loading, error } = usePopularCountries();
  return (
    <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* <div className="rounded-2xl absolute inset-0 bg-gradient-hero" /> */}

          <div className="relative container mx-auto px-4 text-center text-white">
            <div className="max-w-5xl mx-auto">

              <div className="flex justify-center mb-8">
                <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Compass className="h-20 w-20 text-white animate-spin-slow" />
                  <div className="absolute inset-0 bg-gradient-ocean opacity-30 rounded-full blur-xl" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-white">WorldUniversity</span>
                <span className="block text-3xl md:text-5xl text-white/80 mt-4">
                  Global Country Explorer
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                Pencarian informasi tentang seluruh Dunia
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="border-2 border-black/40 20 backdrop-blur-sm text-primary hover:bg-black/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-10 py-4 text-lg">
                  <Link to="/search">
                    <Search className="h-6 w-6 mr-3" />
                    Discover Countries
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-black/40 text-white hover:bg-white/20 backdrop-blur-sm font-semibold px-10 py-4 text-lg">
                  <Link to="/filter">
                    <Filter className="h-6 w-6 mr-3" />
                    Advanced Search
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard icon={<Globe className="h-8 w-8 text-white" />} value={TOTAL_COUNTRIES} label="Countries" className="bg-gradient-ocean rounded-2xl" />
              <StatCard icon={<MapPin className="h-8 w-8 text-white" />} value={TOTAL_POPULATION} label="Population" className="bg-gradient-earth rounded-2xl" />
              <StatCard icon={<Users className="h-8 w-8 text-white" />} value={TOTAL_LANGUAGES} label="Languages" className="bg-primary rounded-2xl" />
              <StatCard icon={<Award className="h-8 w-8 text-accent-foreground" />} value={TOTAL_CURRENCIES} label="Currencies" className="bg-accent rounded-2xl" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Explore the World
                <span className="block text-2xl md:text-3xl text-muted-foreground mt-2 font-normal">
                  Dengan Platform WorldUniversity
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-ocean mx-auto rounded-full" />
            </div>
            <div className="rounded-2xl border-2 border grid lg:grid-cols-3 gap-8">
              <FeatureCard icon={<Search className="h-10 w-10 text-white" />} title="Intelligent Search" description="Carilah negara dari nama, ibu kota, atau daerah mereka." bgClass="bg-gradient-ocean" />
              <FeatureCard icon={<Filter className="h-10 w-10 text-white" />} title="Smart Filtering" description="Filter pencarian negara secara spesifik dengan melihat dari benua, bahasa, dll." bgClass="bg-gradient-earth" />
              <FeatureCard icon={<Globe className="h-10 w-10 text-white" />} title="Rich Data" description="Berisi banyak informasi tentang geografi, budaya, peta negara." bgClass="bg-primary" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
              <div className="mb-8 lg:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Most Populous Nations
                </h2>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Negara dengan populasi paling banyak :
                </p>
              </div>
 
            </div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-muted-foreground mt-4">Loading country data...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center py-20">
                <div className="text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {popularCountries.map((country, index) => (
                    <div key={country.cca3} className="group">
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          {index + 1}
                        </div>
                        <CountryCard
                          country={country}
                          className="hover:scale-105 transition-all duration-300 shadow-card hover:shadow-hover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild size="lg" className="bg-gradient-ocean hover:opacity-90 text-white shadow-lg px-10">
                    <Link to="/search">
                      <Globe className="h-5 w-5 mr-2" />
                      Explore All 195 Countries
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="rounded-2xl py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border border-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full animate-pulse delay-500" />
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Jelajahi dan pelajari keunikan dunia dengan WorldUniversity. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="border-2 border-black/40 20 backdrop-blur-sm text-primary hover:bg-black/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-10 py-4 text-lg">
                  <Link to="/search">
                    <Search className="h-5 w-5 mr-2" />
                    Start Exploring Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
                  <Link to="/about">
                    <Award className="h-5 w-5 mr-2" />
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );

};

export default Home;