
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, CurrencyCode } from "@/services/currencyService";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuoteData {
  id: string;
  timestamp: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  servicioNombre: string;
  dias: number;
  descripcion: string;
  precio: number;
  moneda: CurrencyCode;
  estado: string;
}

const Solicitudes = () => {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Cargar cotizaciones desde localStorage
    const savedQuotes = localStorage.getItem('datyQuotes');
    if (savedQuotes) {
      try {
        const parsedQuotes = JSON.parse(savedQuotes);
        setQuotes(parsedQuotes);
      } catch (error) {
        console.error("Error al cargar cotizaciones:", error);
      }
    }
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para acortar textos largos en vista móvil
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Mis Solicitudes</h1>
          <p className="text-lg md:max-w-2xl">
            Revisa el estado de tus cotizaciones y trabajos solicitados.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          {quotes.length > 0 ? (
            <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Servicio</TableHead>
                    {!isMobile && <TableHead>Descripción</TableHead>}
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    {!isMobile && <TableHead>Plazo</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{formatDate(quote.timestamp)}</TableCell>
                      <TableCell>
                        {isMobile 
                          ? truncateText(quote.servicioNombre, 15) 
                          : quote.servicioNombre
                        }
                      </TableCell>
                      {!isMobile && (
                        <TableCell>{truncateText(quote.descripcion, 50)}</TableCell>
                      )}
                      <TableCell>
                        {formatCurrency(quote.precio, quote.moneda)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quote.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                          quote.estado === 'Confirmado' ? 'bg-green-100 text-green-800' :
                          quote.estado === 'Completado' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {quote.estado}
                        </span>
                      </TableCell>
                      {!isMobile && (
                        <TableCell>{quote.dias} días</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-4">No tienes solicitudes registradas</h3>
              <p className="text-muted-foreground mb-6">
                Cuando realices una cotización o solicites un servicio, podrás ver el historial aquí.
              </p>
              <Button className="bg-daty-600 hover:bg-daty-700" onClick={() => window.location.href = '/cotizar'}>
                Solicitar Cotización
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Solicitudes;
