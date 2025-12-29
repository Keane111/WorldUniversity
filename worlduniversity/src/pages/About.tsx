import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { Globe, Target, Users, Heart, Code, Database, Palette } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="relative -mx-4 -my-8 w-screen" style={{ minHeight: '100vh', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/img/about.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Globe className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-gradient-ocean rounded-full opacity-20 blur-xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            About WorldUniversity
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Platform untuk menjelajahi negara-negara di seluruh dunia. Di sini menyediakan informasi akurat dan terkini tentang setiap negara di Dunia.
          </p>
        </div>



        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-card hover:shadow-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Target className="h-6 w-6 text-primary" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Membuat Platform dimana mudah untuk semua orang di dunia mencari informasi tentang dunia dan dapat dipercaya.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Heart className="h-6 w-6 text-primary" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Membuat Platform di mana orang-orang dapat mempercayai platform kami yang memberikan informasi tentang dunia, mencoba membuat platform kami seakurat dan up-to-date.
              </p>
            </CardContent>
          </Card>
        </div>

 



        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Data Source</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Semua Informasi tentang negara ini adalah dari All{" "}
            <a 
              href="https://restcountries.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              REST Countries API 
            </a>
            , yang didapatkan dari BNCC.
          </p>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;