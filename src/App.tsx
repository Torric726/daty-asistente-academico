
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Servicios from "./pages/Servicios";
import Cotizar from "./pages/Cotizar";
import ComoFunciona from "./pages/ComoFunciona";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Solicitudes from "./pages/Solicitudes";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/cotizar" element={<Cotizar />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
