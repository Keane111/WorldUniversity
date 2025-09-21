import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-teal-600 to-green-700">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;