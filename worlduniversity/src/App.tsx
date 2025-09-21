import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'

import Home from '@/pages/Home'
import CountrySearch from '@/pages/CountrySearch'
import CountryDetail from '@/pages/CountryDetail'
import CountryFilter from '@/pages/CountryFilter'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-teal-600 to-green-700">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<CountrySearch />} />
                <Route path="/filter" element={<CountryFilter />} />
                <Route path="/country/:name" element={<CountryDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
