
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, HelpCircle, Search, User, ClipboardList } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isAdmin, signInWithGoogle, signOut } = useAuth();

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
          <Link to="/solicitudes" className="text-sm font-medium hover:text-daty-600 transition-colors">
            Mis Solicitudes
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-daty-600 hover:text-daty-800 transition-colors">
              Administración
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'Usuario'} />
                    <AvatarFallback>{(currentUser.displayName || 'U')[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/solicitudes">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    <span>Mis Solicitudes</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <User className="mr-2 h-4 w-4" />
                      <span>Panel de Administración</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={signInWithGoogle}>
                Iniciar Sesión
              </Button>
              <Button size="sm" className="bg-daty-600 hover:bg-daty-700" onClick={signInWithGoogle}>
                Registrarse
              </Button>
            </>
          )}
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
            <Link
              to="/solicitudes"
              className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardList size={18} />
              <span>Mis Solicitudes</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 p-3 rounded-md bg-daty-50 hover:bg-daty-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>Administración</span>
              </Link>
            )}
          </nav>
          <div className="flex flex-col gap-2 mt-6">
            {currentUser ? (
              <>
                <div className="flex items-center gap-2 p-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'Usuario'} />
                    <AvatarFallback>{(currentUser.displayName || 'U')[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{currentUser.displayName}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" onClick={() => {
                  signInWithGoogle();
                  setIsMenuOpen(false);
                }}>
                  Iniciar Sesión
                </Button>
                <Button className="w-full bg-daty-600 hover:bg-daty-700" onClick={() => {
                  signInWithGoogle();
                  setIsMenuOpen(false);
                }}>
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
