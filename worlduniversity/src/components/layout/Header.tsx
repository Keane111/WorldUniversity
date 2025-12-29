import { Link, useLocation } from "react-router-dom";
import { Globe, Search, Filter, Info, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  transparent?: boolean;
  useDarkText?: boolean;
}

const Header = ({ transparent = false, useDarkText = false }: HeaderProps) => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Search", path: "/search", icon: Search },
    { name: "Filter", path: "/filter", icon: Filter },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full",
      transparent 
        ? "bg-transparent" 
        : "bg-white border-b border-teal-200 shadow-sm"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Globe className={cn(
                "h-10 w-10 transition-all duration-300 group-hover:rotate-12",
                transparent 
                  ? (useDarkText ? "text-teal-600" : "text-white")
                  : "text-teal-600"
              )} />
              <div className={cn(
                "absolute inset-0 rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity",
                transparent
                  ? (useDarkText ? "bg-teal-100" : "bg-white")
                  : "bg-teal-100"
              )} />
            </div>
            <div>
              <h1 className={cn(
                "text-2xl font-bold transition-colors duration-300",
                transparent
                  ? (useDarkText ? "text-teal-700" : "text-white")
                  : "text-teal-700"
              )}>
                World University 
              </h1>
              <p className={cn(
                "text-sm hidden sm:block transition-colors duration-300",
                transparent
                  ? (useDarkText ? "text-teal-500" : "text-white/80")
                  : "text-teal-500"
              )}>Explore the World</p>
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
                    "flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-300",
                    transparent 
                      ? (useDarkText
                          ? cn(
                              "hover:bg-teal-50 hover:text-teal-700",
                              isActive 
                                ? "bg-teal-100 text-teal-700 font-semibold hover:bg-teal-200"
                                : "text-gray-600"
                            )
                          : cn(
                              "hover:bg-white/20 hover:text-white",
                              isActive 
                                ? "bg-white/30 text-white font-semibold hover:bg-white/40"
                                : "text-white/80"
                            ))
                      : cn(
                          "hover:bg-teal-50 hover:text-teal-700",
                          isActive 
                            ? "bg-teal-100 text-teal-700 font-semibold hover:bg-teal-200"
                            : "text-gray-600"
                        )
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