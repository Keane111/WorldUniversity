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

const BACKGROUND_IMAGES = [
  { url: '/img/home1.png', textColor: 'white' },
  { url: '/img/home2.png', textColor: 'white' },
  { url: '/img/home3.png', textColor: 'black' },
  { url: '/img/home4.png', textColor: 'white' },
  { url: '/img/home5.png', textColor: 'black' },
];

const Home = () => {
  const { popularCountries, loading, error } = usePopularCountries();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past the hero section (approximately viewport height)
      const heroHeight = window.innerHeight * 0.8; // 80% of viewport height
      setScrolledPastHero(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentImage = BACKGROUND_IMAGES[currentImageIndex];
  const isWhiteText = currentImage.textColor === 'white';

  return (
    <Layout transparentHeader={true} useDarkNav={scrolledPastHero}>
      <div className="bg-black">
        <section className="relative flex items-center justify-center overflow-hidden w-full min-h-screen" style={{ marginTop: '-80px', paddingTop: '80px' }}>
          {/* Background images with fade transition */}
          {BACKGROUND_IMAGES.map((img, index) => (
            <div
              key={img.url}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${img.url})`,
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}

          <div className="relative container mx-auto px-4 text-center z-10">
            <div className="max-w-5xl mx-auto">

              <div className="flex justify-center mb-8">
                <div className={`relative p-6 ${isWhiteText ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-sm rounded-full border ${isWhiteText ? 'border-white/20' : 'border-black/20'} transition-all duration-1000`}>
                  <Compass className={`h-20 w-20 ${isWhiteText ? 'text-white' : 'text-black'} animate-spin-slow transition-colors duration-1000`} />
                  <div className={`absolute inset-0 bg-gradient-ocean opacity-30 rounded-full blur-xl`} />
                </div>
              </div>

              <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight font-heading">
                <span className={`block ${isWhiteText ? 'text-white' : 'text-black'} transition-colors duration-1000`}>WorldUniversity</span>
                <span className={`block text-3xl md:text-5xl ${isWhiteText ? 'text-white/80' : 'text-black/80'} mt-4 transition-colors duration-1000`}>
                  Global Country Explorer
                </span>
              </h1>

              <p className={`text-xl md:text-2xl ${isWhiteText ? 'text-white/90' : 'text-black/90'} max-w-3xl mx-auto mb-12 leading-relaxed transition-colors duration-1000`}>
                Pencarian informasi tentang seluruh Dunia
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className={`border-2 ${isWhiteText ? 'border-white/40 text-white hover:bg-white/20' : 'border-black/40 text-black hover:bg-black/20'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-1000 font-semibold px-10 py-4 text-lg`}>
                  <Link to="/search">
                    <Search className="h-6 w-6 mr-3" />
                    Discover Countries
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className={`border-2 ${isWhiteText ? 'border-white/40 text-white hover:bg-white/20' : 'border-black/40 text-black hover:bg-black/20'} backdrop-blur-sm font-semibold px-10 py-4 text-lg transition-all duration-1000`}>
                  <Link to="/filter">
                    <Filter className="h-6 w-6 mr-3" />
                    Advanced Search
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Stats Card Container - positioned between sections */}
      <div className="relative -mt-20 mb-10 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-2xl shadow-2xl p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Globe className="h-5 w-5 text-white mx-auto mb-1" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{TOTAL_COUNTRIES}</div>
                <div className="text-xs text-white/70 font-medium">Countries</div>
              </div>
              <div className="text-center">
                <MapPin className="h-5 w-5 text-white mx-auto mb-1" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{TOTAL_POPULATION}</div>
                <div className="text-xs text-white/70 font-medium">Population</div>
              </div>
              <div className="text-center">
                <Users className="h-5 w-5 text-white mx-auto mb-1" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{TOTAL_LANGUAGES}</div>
                <div className="text-xs text-white/70 font-medium">Languages</div>
              </div>
              <div className="text-center">
                <Award className="h-5 w-5 text-white mx-auto mb-1" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{TOTAL_CURRENCIES}</div>
                <div className="text-xs text-white/70 font-medium">Currencies</div>
              </div>
            </div>
          </div>
        </div>
      </div>


        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-teal-600 to-green-700 bg-clip-text text-transparent font-heading">
                Explore the World
                <span className="block text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-teal-600 to-green-700 bg-clip-text text-transparent mt-2 font-normal">
                  Dengan Platform WorldUniversity
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-ocean mx-auto rounded-full" />
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <FeatureCard icon={<Search className="h-10 w-10 text-white" />} title="Intelligent Search" description="Carilah negara dari nama, ibu kota, atau daerah mereka." bgClass="bg-gradient-ocean" bgImage="/img/intelligent_search.png" />
              <FeatureCard icon={<Filter className="h-10 w-10 text-white" />} title="Smart Filtering" description="Filter pencarian negara secara spesifik dengan melihat dari benua, bahasa, dll." bgClass="bg-gradient-earth" bgImage="/img/smart_filtering.png" />
              <FeatureCard icon={<Globe className="h-10 w-10 text-white" />} title="Rich Data" description="Berisi banyak informasi tentang geografi, budaya, peta negara." bgClass="bg-primary" bgImage="/img/rich_data.png" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="order-2 lg:order-1">
                <img
                  src="/img/About_card.png"
                  alt="About WorldUniversity"
                  className="w-3/4 mx-auto lg:w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-heading">
                  About
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  WorldUniversity adalah platform yang menyediakan informasi lengkap tentang negara-negara di seluruh dunia. Kami berkomitmen untuk memberikan data yang akurat dan terkini, membantu Anda menjelajahi berbagai aspek geografi, budaya, dan karakteristik unik dari setiap negara.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
              <div className="mb-8 lg:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-teal-600 to-green-700 bg-clip-text text-transparent font-heading">
                  Most Populous Nations
                </h2>
                <p className="text-xl bg-gradient-to-r from-blue-600 via-teal-600 to-green-700 bg-clip-text text-transparent max-w-lg">
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

        <section className="bg-black rounded-2xl py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border border-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full animate-pulse delay-500" />
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Jelajahi dan pelajari keunikan dunia dengan WorldUniversity. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="border-2 border-white backdrop-blur-sm text-primary hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-10 py-4 text-lg">
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