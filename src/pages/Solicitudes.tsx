
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { formatCurrency, CurrencyCode } from "@/services/currencyService";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { getAllQuotes, getUserQuotes, getLocalQuotes, Quote } from "@/services/quoteService";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Search, 
  SlidersHorizontal,
  Phone,
  Mail,
  Calendar,
  Clock,
  FileText,
  User
} from "lucide-react";

const Solicitudes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const isMobile = useIsMobile();
  const { currentUser, isAdmin } = useAuth();
  
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        let fetchedQuotes: Quote[] = [];
        
        if (currentUser) {
          if (isAdmin) {
            // Si es admin, obtener todas las cotizaciones
            fetchedQuotes = await getAllQuotes();
          } else {
            // Si es usuario normal, obtener solo sus cotizaciones
            fetchedQuotes = await getUserQuotes(currentUser.uid);
          }
        } else {
          // Si no hay usuario, usar localStorage (compatibilidad)
          fetchedQuotes = getLocalQuotes();
        }
        
        // Ordenar por fecha (más reciente primero)
        fetchedQuotes.sort((a, b) => b.timestamp - a.timestamp);
        
        setQuotes(fetchedQuotes);
        setFilteredQuotes(fetchedQuotes);
      } catch (error) {
        console.error("Error al cargar cotizaciones:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuotes();
  }, [currentUser, isAdmin]);
  
  useEffect(() => {
    // Filtrar por término de búsqueda y estado
    let filtered = quotes;
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(quote => 
        quote.nombre.toLowerCase().includes(term) ||
        quote.email.toLowerCase().includes(term) ||
        quote.servicioNombre.toLowerCase().includes(term) ||
        quote.descripcion.toLowerCase().includes(term) ||
        quote.id?.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por estado
    if (filterStatus !== "all") {
      filtered = filtered.filter(quote => quote.estado === filterStatus);
    }
    
    setFilteredQuotes(filtered);
  }, [quotes, searchTerm, filterStatus]);

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

  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsDialogOpen(true);
  };

  const statusClasses = {
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Confirmado: 'bg-green-100 text-green-800',
    Completado: 'bg-blue-100 text-blue-800',
    Cancelado: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isAdmin ? "Panel de Solicitudes" : "Mis Solicitudes"}
          </h1>
          <p className="text-lg md:max-w-2xl">
            {isAdmin 
              ? "Administra y gestiona todas las cotizaciones y trabajos solicitados por los usuarios."
              : "Revisa el estado de tus cotizaciones y trabajos solicitados."
            }
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-daty-600"></div>
            </div>
          ) : filteredQuotes.length > 0 ? (
            <>
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
                <div className="p-4 border-b">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Buscar por nombre, email, servicio..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                      <select
                        className="bg-background border rounded-md px-2 py-1 text-sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">Todos los estados</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{isAdmin ? "Cliente" : "ID"}</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Servicio</TableHead>
                        {!isMobile && <TableHead>Descripción</TableHead>}
                        <TableHead>Precio</TableHead>
                        <TableHead>Estado</TableHead>
                        {!isMobile && <TableHead>Plazo</TableHead>}
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell className="font-medium">
                            {isAdmin ? (
                              <div className="flex items-center gap-2">
                                {quote.photoURL ? (
                                  <img 
                                    src={quote.photoURL} 
                                    alt={quote.nombre}
                                    className="w-6 h-6 rounded-full"
                                  />
                                ) : (
                                  <User className="w-5 h-5 text-muted-foreground" />
                                )}
                                <span>{truncateText(quote.nombre, 15)}</span>
                              </div>
                            ) : (
                              quote.id
                            )}
                          </TableCell>
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
                              statusClasses[quote.estado as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
                            }`}>
                              {quote.estado}
                            </span>
                          </TableCell>
                          {!isMobile && (
                            <TableCell>{quote.dias} días</TableCell>
                          )}
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewDetails(quote)}
                            >
                              Ver detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {isAdmin && quotes.length > 0 && (
                <div className="bg-daty-50 p-4 rounded-lg border border-daty-100 mb-8">
                  <h3 className="font-medium text-lg mb-2">Resumen</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-muted-foreground">Total solicitudes</p>
                      <p className="text-xl font-bold">{quotes.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-muted-foreground">Pendientes</p>
                      <p className="text-xl font-bold text-yellow-600">
                        {quotes.filter(q => q.estado === "Pendiente").length}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-muted-foreground">Confirmados</p>
                      <p className="text-xl font-bold text-green-600">
                        {quotes.filter(q => q.estado === "Confirmado").length}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-muted-foreground">Completados</p>
                      <p className="text-xl font-bold text-blue-600">
                        {quotes.filter(q => q.estado === "Completado").length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-4">No tienes solicitudes registradas</h3>
              <p className="text-muted-foreground mb-6">
                {currentUser 
                  ? "Cuando realices una cotización o solicites un servicio, podrás ver el historial aquí."
                  : "Inicia sesión para ver tus solicitudes o realiza una nueva cotización."
                }
              </p>
              <Button className="bg-daty-600 hover:bg-daty-700" onClick={() => window.location.href = '/cotizar'}>
                Solicitar Cotización
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedQuote && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Detalles de Solicitud {selectedQuote.id}</DialogTitle>
              <DialogDescription>
                Información completa de la solicitud
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="contact">Contacto</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Servicio</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedQuote.servicioNombre}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Estado</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusClasses[selectedQuote.estado as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedQuote.estado}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm font-medium leading-none">Fecha de solicitud</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {formatDate(selectedQuote.timestamp)}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm font-medium leading-none">Plazo solicitado</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {selectedQuote.dias} días
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm font-medium leading-none">Descripción</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {selectedQuote.descripcion}
                    </p>
                  </div>
                  
                  <div className="bg-daty-50 p-3 rounded-md mt-4">
                    <p className="text-sm font-medium">Precio final</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(selectedQuote.precio, selectedQuote.moneda)}
                      <span className="text-xs font-normal text-muted-foreground ml-2">
                        (incluye 20% de descuento)
                      </span>
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="contact" className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm font-medium leading-none">Nombre</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {selectedQuote.nombre}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm font-medium leading-none">Email</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {selectedQuote.email}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm font-medium leading-none">Teléfono</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {selectedQuote.telefono}
                    </p>
                  </div>
                  
                  {isAdmin && (
                    <div className="pt-4 mt-4 border-t">
                      <p className="text-sm font-medium mb-2">Acciones</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" 
                          onClick={() => window.open(`mailto:${selectedQuote.email}?subject=DATY - Solicitud ${selectedQuote.id}`, '_blank')}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </Button>
                        {selectedQuote.telefono && (
                          <Button variant="outline" size="sm"
                            onClick={() => window.open(`tel:${selectedQuote.telefono}`, '_blank')}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Llamar
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cerrar
              </Button>
              {isAdmin && (
                <Button className="bg-daty-600 hover:bg-daty-700">
                  Actualizar Estado
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      <Footer />
    </>
  );
};

export default Solicitudes;
