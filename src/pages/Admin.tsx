
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { getAllQuotes, Quote, updateQuoteStatus } from "@/services/quoteService";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPriceWithUSDEquivalent } from "@/services/currencyService";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Users, PieChart as PieChartIcon, Calendar, DollarSign } from "lucide-react";

const Admin = () => {
  const { currentUser, isAdmin } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        const fetchedQuotes = await getAllQuotes();
        setQuotes(fetchedQuotes);
      } catch (error) {
        console.error("Error al cargar cotizaciones:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAdmin) {
      fetchQuotes();
    }
  }, [isAdmin]);

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" />;
  }

  const totalQuotes = quotes.length;
  const totalRevenue = quotes.reduce((sum, quote) => sum + quote.precio, 0);
  const averageDays = quotes.length > 0 
    ? quotes.reduce((sum, quote) => sum + quote.dias, 0) / quotes.length 
    : 0;
  
  // Fix for the type errors in service data aggregation
  const serviceData = quotes.reduce<{ name: string, value: number }[]>((acc, quote) => {
    const existingService = acc.find(item => item.name === quote.servicioNombre);
    if (existingService) {
      existingService.value += 1;
    } else {
      acc.push({ name: quote.servicioNombre, value: 1 });
    }
    return acc;
  }, []);
  
  // Fix for the type errors in status data aggregation
  const statusData = quotes.reduce<{ name: string, value: number }[]>((acc, quote) => {
    const existingStatus = acc.find(item => item.name === quote.estado);
    if (existingStatus) {
      existingStatus.value += 1;
    } else {
      acc.push({ name: quote.estado, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const STATUS_COLORS = {
    'Pendiente': '#FFBB28',
    'Confirmado': '#00C49F',
    'Completado': '#0088FE',
    'Cancelado': '#FF8042'
  };

  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Panel de Administración</h1>
          <p className="text-lg md:max-w-2xl">
            Gestiona todas las solicitudes, visualiza estadísticas y accede a la información detallada de los usuarios.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-daty-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalQuotes}</div>
                    <p className="text-xs text-muted-foreground">
                      Solicitudes registradas
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(totalRevenue, 'USD')}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Valor de cotizaciones (USD)
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Plazo Promedio</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{averageDays.toFixed(1)} días</div>
                    <p className="text-xs text-muted-foreground">
                      Tiempo solicitado
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                    <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">
                      {quotes.filter(q => q.estado === "Pendiente").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Por atender
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="stats" className="mb-8">
                <TabsList className="grid grid-cols-2 max-w-[400px]">
                  <TabsTrigger value="stats">Estadísticas</TabsTrigger>
                  <TabsTrigger value="recent">Recientes</TabsTrigger>
                </TabsList>
                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribución por Servicio</CardTitle>
                        <CardDescription>
                          Número de solicitudes por tipo de servicio
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        {serviceData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={serviceData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {serviceData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">No hay datos disponibles</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Estado de Solicitudes</CardTitle>
                        <CardDescription>
                          Distribución por estado actual
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        {statusData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {statusData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">No hay datos disponibles</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="recent">
                  <Card>
                    <CardHeader>
                      <CardTitle>Solicitudes Recientes</CardTitle>
                      <CardDescription>
                        Últimas 5 solicitudes recibidas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {quotes.slice(0, 5).map((quote, index) => (
                        <div key={quote.id} className={`flex justify-between items-center py-3 ${index !== 0 ? 'border-t' : ''}`}>
                          <div>
                            <p className="font-medium">{quote.nombre}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{quote.servicioNombre}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(quote.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quote.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                              quote.estado === 'Confirmado' ? 'bg-green-100 text-green-800' :
                              quote.estado === 'Completado' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {quote.estado}
                            </span>
                            <span className="text-sm mt-1 font-medium">
                              {formatPriceWithUSDEquivalent(quote.precio, quote.moneda)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => window.location.href = '/solicitudes'}>
                        Ver todas las solicitudes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="bg-daty-50 border border-daty-100 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Acciones rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Button className="bg-daty-600 hover:bg-daty-700" onClick={() => window.location.href = '/solicitudes'}>
                    Gestionar Solicitudes
                  </Button>
                  <Button variant="outline">
                    Exportar Datos
                  </Button>
                  <Button variant="outline">
                    Configuración
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Admin;
