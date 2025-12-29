import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  transparentHeader?: boolean;
  useDarkNav?: boolean;
}

const Layout = ({ children, transparentHeader = false, useDarkNav = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header transparent={transparentHeader} useDarkText={useDarkNav} />
      <main className={transparentHeader ? "" : "flex-1 container mx-auto px-4 py-8 max-w-7xl"}>
        {children}
      </main>
    </div>
  );
};

export default Layout;