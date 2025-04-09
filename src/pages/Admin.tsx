
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  Eye, 
  FileSpreadsheet, 
  MoreVertical, 
  Search,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";
import * as XLSX from 'xlsx';

// Interfaces
interface Quote {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  servicio_nombre: string;
  dias: number;
  descripcion: string;
  precio: number;
  precio_moneda_seleccionada: string;
  moneda_seleccionada: string;
  estado: string;
  [key: string]: any; // Para propiedades adicionales
}

const Admin = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailView, setDetailView] = useState<Quote | null>(null);
  const itemsPerPage = 10;
  
  // Verificar acceso de administrador
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("datyCurrentUser") || "null");
    
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/registro");
    }
  }, [navigate]);
  
  // Cargar cotizaciones
  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem("datyCotizaciones") || "[]");
    setQuotes(storedQuotes);
    setFilteredQuotes(storedQuotes);
  }, []);
  
  // Filtrar cotizaciones cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = quotes.filter(quote => 
        quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.servicio_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuotes(filtered);
      setCurrentPage(1);
    } else {
      setFilteredQuotes(quotes);
    }
  }, [searchTerm, quotes]);
  
  // Cambiar estado de una cotización
  const updateQuoteStatus = (id: string, newStatus: string) => {
    const updatedQuotes = quotes.map(quote => 
      quote.id === id ? { ...quote, estado: newStatus } : quote
    );
    
    setQuotes(updatedQuotes);
    setFilteredQuotes(
      filteredQuotes.map(quote => 
        quote.id === id ? { ...quote, estado: newStatus } : quote
      )
    );
    
    // Actualizar en localStorage
    localStorage.setItem("datyCotizaciones", JSON.stringify(updatedQuotes));
  };
  
  // Descargar Excel
  const downloadExcel = () => {
    try {
      // Crear libro y hoja
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(quotes);
      
      // Formatear columnas
      const colWidths = [
        { wch: 10 },  // ID
        { wch: 20 },  // Fecha
        { wch: 25 },  // Nombre
        { wch: 25 },  // Email
        { wch: 15 },  // Teléfono
        { wch: 20 },  // Servicio
        { wch: 10 },  // Días
        { wch: 40 },  // Descripción
        { wch: 10 },  // Precio USD
        { wch: 10 },  // Precio BOB
        { wch: 10 },  // Precio EUR
        { wch: 15 },  // Moneda seleccionada
        { wch: 15 },  // Precio en moneda seleccionada
        { wch: 15 },  // Estado
      ];
      
      worksheet['!cols'] = colWidths;
      
      // Añadir hoja al libro
      XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
      
      // Descargar
      XLSX.writeFile(workbook, "DATY_Cotizaciones.xlsx");
    } catch (error) {
      console.error("Error al descargar Excel:", error);
    }
  };
  
  // Paginación
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuotes = filteredQuotes.slice(startIndex, startIndex + itemsPerPage);
  
  // Vista de detalles
  const viewDetails = (quote: Quote) => {
    setDetailView(quote);
  };
  
  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Panel de Administración</h1>
          <p className="text-lg md:max-w-2xl">
            Gestiona todas las cotizaciones y solicitudes de clientes.
          </p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container px-4">
          {detailView ? (
            <div className="bg-white rounded-lg border shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDetailView(null)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    detailView.estado === "Completado" ? "bg-green-100 text-green-800" :
                    detailView.estado === "En progreso" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {detailView.estado || "Pendiente"}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Cambiar estado
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => updateQuoteStatus(detailView.id, "Pendiente")}>
                        Pendiente
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateQuoteStatus(detailView.id, "En progreso")}>
                        En progreso
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateQuoteStatus(detailView.id, "Completado")}>
                        Completado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-heading">Detalles de la Cotización</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">ID de cotización</h3>
                      <p className="text-lg">{detailView.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Fecha de solicitud</h3>
                      <p className="text-lg">{detailView.fecha}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Servicio</h3>
                      <p className="text-lg">{detailView.servicio_nombre}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Plazo solicitado</h3>
                      <p className="text-lg">{detailView.dias} días</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Precio base (USD)</h3>
                      <p className="text-xl font-semibold">${detailView.precio}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Moneda seleccionada</h3>
                      <p className="text-lg">{detailView.moneda_seleccionada}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Precio en {detailView.moneda_seleccionada}</h3>
                      <p className="text-lg">{
                        detailView.moneda_seleccionada === "USD" ? "$" :
                        detailView.moneda_seleccionada === "EUR" ? "€" :
                        detailView.moneda_seleccionada === "GBP" ? "£" :
                        detailView.moneda_seleccionada === "BOB" ? "Bs. " :
                        detailView.moneda_seleccionada === "MXN" ? "$ " :
                        detailView.moneda_seleccionada === "COP" ? "$ " : ""
                      }{detailView.precio_moneda_seleccionada}</p>
                    </div>
                    {detailView.precio_bob && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Precio en BOB</h3>
                        <p className="text-lg">Bs. {detailView.precio_bob}</p>
                      </div>
                    )}
                    {detailView.precio_eur && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Precio en EUR</h3>
                        <p className="text-lg">€{detailView.precio_eur}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-heading">Información del Cliente</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                        <p className="text-lg">{detailView.nombre}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p className="text-lg">{detailView.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Teléfono</h3>
                      <p className="text-lg">{detailView.telefono}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mt-6 mb-4 gradient-heading">Descripción del Trabajo</h2>
                  <div className="bg-gray-50 p-4 rounded border">
                    <p>{detailView.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, nombre, email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={downloadExcel} className="w-full md:w-auto bg-daty-600 hover:bg-daty-700">
                  <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar a Excel
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableCaption>Total de cotizaciones: {filteredQuotes.length}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Precio USD</TableHead>
                      <TableHead>Moneda</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedQuotes.length > 0 ? (
                      paginatedQuotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell className="font-medium">{quote.id}</TableCell>
                          <TableCell>{quote.fecha ? quote.fecha.split(" ")[0] : "-"}</TableCell>
                          <TableCell>{quote.nombre}</TableCell>
                          <TableCell>{quote.servicio_nombre}</TableCell>
                          <TableCell>${quote.precio}</TableCell>
                          <TableCell>{quote.moneda_seleccionada}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              quote.estado === "Completado" ? "bg-green-100 text-green-800" :
                              quote.estado === "En progreso" ? "bg-blue-100 text-blue-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {quote.estado || "Pendiente"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewDetails(quote)}>
                                  <Eye className="mr-2 h-4 w-4" /> Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Pendiente")}>
                                  Marcar como pendiente
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "En progreso")}>
                                  Marcar en progreso
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Completado")}>
                                  Marcar como completado
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No se encontraron cotizaciones
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredQuotes.length)} de {filteredQuotes.length}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Admin;
