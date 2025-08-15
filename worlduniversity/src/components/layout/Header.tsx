import { Link, useLocation } from "react-router-dom";
import { Globe, Search, Filter, Info, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", path: "/search", icon: Search },
    { name: "Filter", path: "/filter", icon: Filter },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Globe className="h-10 w-10 text-blue-600 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-700">
                Country Compass
              </h1>
              <p className="text-sm text-blue-500 hidden sm:block">Explore the World</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-200",
                    "hover:bg-blue-50 hover:text-blue-700",
                    isActive 
                      ? "bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200"
                      : "text-gray-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;