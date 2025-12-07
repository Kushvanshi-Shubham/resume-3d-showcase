import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PerformanceProvider } from "./contexts/PerformanceContext";
import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import Hero3DErrorBoundary from "./components/Hero3DErrorBoundary";
import Hero3DFallback from "./components/Hero3DFallback";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Lazy load 3D background for better initial load
const Hero3D = lazy(() => import("./components/Hero3D"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <PerformanceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground relative">
              {/* Global 3D Background with Error Boundary and Lazy Loading */}
              <div className="fixed inset-0 -z-10">
                <Hero3DErrorBoundary>
                  <Suspense fallback={<Hero3DFallback />}>
                    <Hero3D />
                  </Suspense>
                </Hero3DErrorBoundary>
              </div>
              
              <Navigation />
              <AnimatedRoutes />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </PerformanceProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
