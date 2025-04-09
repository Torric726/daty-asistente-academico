
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as XLSX from 'xlsx';

// Servicios disponibles para selección con precios actualizados
const services = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 15,
  },
  {
    id: 2,
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 8,
  },
  {
    id: 3,
    name: "PROYECTOS Y ESTRATEGIAS",
    price: 7,
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 15,
  },
  {
    id: 5,
    name: "VISUALIZADORES Y REPORTES",
    price: 8,
  },
  {
    id: 6,
    name: "INFORMES Y DOCUMENTACIÓN",
    price: 5,
  }
];

// Tasas de conversión (valores aproximados, en la práctica se usaría una API)
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  BOB: 6.91, // Boliviano
  MXN: 16.95, // Peso mexicano
  COP: 3950, // Peso colombiano
};

const formSchema = z.object({
  nombre: z.string().min(3, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  telefono: z.string().min(8, { message: "Teléfono inválido" }),
  servicio: z.string({ required_error: "Seleccione un servicio" }),
  dias: z.coerce.number().min(1, { message: "Debe ser al menos 1 día" }).max(60, { message: "Máximo 60 días" }),
  descripcion: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const QuoteForm = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service");
  
  const [price, setPrice] = useState<number | null>(null);
  const [urgent, setUrgent] = useState<boolean>(false);
  const [currency, setCurrency] = useState<keyof typeof exchangeRates>("USD");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      servicio: preselectedService || "",
      dias: 7,
      descripcion: "",
    },
  });

  // Calcular precio cuando cambian los valores relevantes
  const calculatePrice = (serviceId: string, days: number) => {
    const selectedService = services.find(s => s.id.toString() === serviceId);
    if (!selectedService) return null;

    let basePrice = selectedService.price;
    let urgencyFee = 0;

    // Cargo por urgencia
    if (days < 3) {
      urgencyFee = 7;
      setUrgent(true);
    } else if (days < 5) {
      urgencyFee = 4;
      setUrgent(true);
    } else {
      setUrgent(false);
    }

    const total = basePrice + urgencyFee;
    return {
      basePrice,
      urgencyFee,
      total
    };
  };

  // Actualizar precio cuando cambia el servicio o los días
  const watchService = form.watch("servicio");
  const watchDias = form.watch("dias");

  // Convertir precio a la moneda seleccionada
  const convertPrice = (priceUSD: number) => {
    return (priceUSD * exchangeRates[currency]).toFixed(2);
  };

  // Función para guardar en Excel
  const saveToExcel = (data: any) => {
    try {
      // Obtener la lista actual de cotizaciones
      const existingData = JSON.parse(localStorage.getItem('datyCotizaciones') || '[]');
      
      // Generar un ID secuencial
      const nextId = existingData.length > 0 
        ? Math.max(...existingData.map((item: any) => parseInt(item.id) || 0)) + 1 
        : 1;
      
      // Obtener fecha actual formateada
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      // Crear objeto completo para guardar
      const completeData = {
        id: nextId.toString(),
        fecha: formattedDate,
        ...data,
        precio_usd: data.precio,
        precio_bob: (data.precio * exchangeRates.BOB).toFixed(2),
        precio_eur: (data.precio * exchangeRates.EUR).toFixed(2),
        moneda_seleccionada: currency,
        estado: "Pendiente",
      };
      
      // Añadir a la lista existente
      existingData.push(completeData);
      
      // Guardar la información actualizada
      localStorage.setItem('datyCotizaciones', JSON.stringify(existingData));
      
      // Crear libro Excel
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(existingData);
      
      // Dar formato a las columnas (ancho)
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
        { wch: 10 },  // Moneda
        { wch: 15 },  // Estado
      ];
      
      worksheet['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
      
      // Generar blob para descarga (solo para administradores)
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Guardar URL para acceso futuro
      const url = URL.createObjectURL(blob);
      localStorage.setItem('datyExcelURL', url);
      localStorage.setItem('datyExcelLastUpdate', formattedDate);
      
      console.log("Datos guardados correctamente:", completeData);
      
      return nextId.toString();
    } catch (error) {
      console.error("Error al guardar en Excel:", error);
      return null;
    }
  };

  const onSubmit = (values: FormValues) => {
    // Calcular precio final
    const priceDetails = calculatePrice(values.servicio, values.dias);
    const finalPrice = priceDetails ? priceDetails.total : 0;
    
    // Obtener nombre del servicio
    const serviceName = services.find(s => s.id.toString() === values.servicio)?.name || "";
    
    // Datos para guardar
    const saveData = {
      ...values,
      precio: finalPrice,
      servicio_nombre: serviceName,
    };
    
    // Guardar datos y obtener ID
    const jobId = saveToExcel(saveData);
    
    if (jobId) {
      // Mostrar toast de confirmación
      toast({
        title: "Cotización enviada",
        description: `Tu solicitud #${jobId} ha sido registrada. Te contactaremos pronto.`,
      });
      
      // Resetear formulario
      form.reset();
    } else {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  // Actualizar precio cada vez que cambian servicio o días
  useEffect(() => {
    if (watchService && watchDias) {
      const priceDetails = calculatePrice(watchService, watchDias);
      setPrice(priceDetails ? priceDetails.total : null);
    }
  }, [watchService, watchDias]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Tu número telefónico con código de país (+591)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicio</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    const priceDetails = calculatePrice(value, watchDias);
                    setPrice(priceDetails ? priceDetails.total : null);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name} (${service.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plazo de entrega (días)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1}
                    max={60}
                    onChange={(e) => {
                      field.onChange(e);
                      const value = parseInt(e.target.value);
                      if (value && watchService) {
                        const priceDetails = calculatePrice(watchService, value);
                        setPrice(priceDetails ? priceDetails.total : null);
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1">
                <label className="text-sm font-medium">Moneda</label>
                <Select 
                  defaultValue="USD"
                  onValueChange={(value) => setCurrency(value as keyof typeof exchangeRates)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD (Dólar Americano)</SelectItem>
                    <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    <SelectItem value="GBP">GBP (Libra Esterlina)</SelectItem>
                    <SelectItem value="BOB">BOB (Boliviano)</SelectItem>
                    <SelectItem value="MXN">MXN (Peso Mexicano)</SelectItem>
                    <SelectItem value="COP">COP (Peso Colombiano)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {urgent && (
            <div className="md:col-span-2 bg-yellow-50 p-3 rounded-md border border-yellow-200 text-yellow-800 text-sm">
              ⚠️ Los plazos menores a 5 días tienen un cargo adicional por urgencia.
            </div>
          )}

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del trabajo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe lo que necesitas con el mayor detalle posible"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {price && (
          <div className="bg-daty-50 p-4 rounded-md border border-daty-100">
            <h3 className="font-medium text-lg mb-1">Tu cotización:</h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white p-2 rounded border">
                <p className="text-sm text-muted-foreground">USD (Dólar)</p>
                <p className="text-xl font-bold text-daty-700">${price.toFixed(2)}</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="text-sm text-muted-foreground">BOB (Boliviano)</p>
                <p className="text-xl font-bold text-daty-700">Bs. {(price * exchangeRates.BOB).toFixed(2)}</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="text-sm text-muted-foreground">EUR (Euro)</p>
                <p className="text-xl font-bold text-daty-700">€{(price * exchangeRates.EUR).toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Precio a pagar en {currency}:</p>
              <p className="text-2xl font-bold text-daty-700">{
                currency === "USD" ? "$" :
                currency === "EUR" ? "€" :
                currency === "GBP" ? "£" :
                currency === "BOB" ? "Bs. " :
                currency === "MXN" ? "$ " :
                currency === "COP" ? "$ " : ""
              }{convertPrice(price)}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">*Los posibles descuentos serán evaluados por la persona a cargo de tu proyecto.</p>
          </div>
        )}

        <Button type="submit" className="w-full bg-daty-600 hover:bg-daty-700">
          Solicitar Cotización
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;
