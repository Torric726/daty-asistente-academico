
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-daty-950 text-white">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-daty-500 text-white font-bold">D</div>
              <span className="text-xl font-bold">DATY</span>
            </div>
            <p className="text-gray-300 text-sm">
              Servicios digitales profesionales para proyectos y análisis de datos. 
              Soluciones profesionales para sus necesidades digitales.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/servicios" className="hover:text-white">Análisis de Datos</Link></li>
              <li><Link to="/servicios" className="hover:text-white">Tareas y Trabajos Digitales</Link></li>
              <li><Link to="/servicios" className="hover:text-white">Proyectos y Estrategias</Link></li>
              <li><Link to="/servicios" className="hover:text-white">Investigaciones y Tesinas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Información</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/como-funciona" className="hover:text-white">Cómo Funciona</Link></li>
              <li><Link to="/faq" className="hover:text-white">Preguntas Frecuentes</Link></li>
              <li><Link to="/cotizar" className="hover:text-white">Cotizar Servicio</Link></li>
              <li><Link to="/terminos" className="hover:text-white">Términos y Condiciones</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>contact@daty.com</li>
              <li>+591 72012345</li>
              <li>Lunes a Viernes: 9am - 6pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-gray-400 text-sm text-center">
          <p>© {new Date().getFullYear()} DATY - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
