
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, HelpCircle, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-daty-600 text-white font-bold">D</div>
            <span className="text-xl font-bold text-daty-800">DATY</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/servicios" className="text-sm font-medium hover:text-daty-600 transition-colors">
            Servicios
          </Link>
          <Link to="/cotizar" className="text-sm font-medium hover:text-daty-600 transition-colors">
            Cotizar
          </Link>
          <Link to="/como-funciona" className="text-sm font-medium hover:text-daty-600 transition-colors">
            Cómo Funciona
          </Link>
          <Link to="/faq" className="text-sm font-medium hover:text-daty-600 transition-colors">
            Preguntas Frecuentes
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm">
            Iniciar Sesión
          </Button>
          <Button size="sm" className="bg-daty-600 hover:bg-daty-700">
            Registrarse
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 p-4">
          <nav className="flex flex-col gap-4 py-4">
            <Link
              to="/servicios"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Briefcase size={18} />
              <span>Servicios</span>
            </Link>
            <Link
              to="/cotizar"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={18} />
              <span>Cotizar</span>
            </Link>
            <Link
              to="/como-funciona"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle size={18} />
              <span>Cómo Funciona</span>
            </Link>
            <Link
              to="/faq"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle size={18} />
              <span>Preguntas Frecuentes</span>
            </Link>
          </nav>
          <div className="flex flex-col gap-2 mt-6">
            <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
              Iniciar Sesión
            </Button>
            <Button className="w-full bg-daty-600 hover:bg-daty-700" onClick={() => setIsMenuOpen(false)}>
              Registrarse
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
