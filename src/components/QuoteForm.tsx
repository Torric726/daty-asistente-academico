
import { useState } from "react";
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

// Servicios disponibles para selección
const services = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 50,
  },
  {
    id: 2,
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 40,
  },
  {
    id: 3,
    name: "PROYECTOS Y ESTRATEGIAS",
    price: 60,
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 70,
  },
  {
    id: 5,
    name: "VISUALIZADORES Y REPORTES",
    price: 55,
  },
  {
    id: 6,
    name: "INFORMES Y DOCUMENTACIÓN",
    price: 45,
  }
];

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
      urgencyFee = 20;
      setUrgent(true);
    } else if (days < 5) {
      urgencyFee = 10;
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

  // Función para guardar en Excel
  const saveToExcel = (data: FormValues & { precio: number, fecha: string, id: string }) => {
    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;
    
    try {
      // Intentar cargar el archivo existente si está en localStorage
      const existingData = localStorage.getItem('datyCotizaciones');
      
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        parsedData.push(data);
        localStorage.setItem('datyCotizaciones', JSON.stringify(parsedData));
        
        // Crear libro de Excel
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.json_to_sheet(parsedData);
      } else {
        // Si no existe, crear nuevo
        const newData = [data];
        localStorage.setItem('datyCotizaciones', JSON.stringify(newData));
        
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.json_to_sheet(newData);
      }
      
      XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
      
      // Generar archivo para descargar (solo para desarrollo)
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Guardar en localStorage para futuras referencias
      const url = URL.createObjectURL(blob);
      localStorage.setItem('datyExcelURL', url);
      
      console.log("Datos guardados en Excel:", data);
      
    } catch (error) {
      console.error("Error al guardar en Excel:", error);
    }
  };

  const onSubmit = (values: FormValues) => {
    // Generar ID único para el trabajo
    const jobId = `DATY-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Obtener la fecha actual
    const currentDate = new Date().toISOString();
    
    // Calcular precio final
    const priceDetails = calculatePrice(values.servicio, values.dias);
    const finalPrice = priceDetails ? priceDetails.total : 0;
    
    // Crear objeto completo para guardar
    const completeData = {
      ...values,
      precio: finalPrice,
      fecha: currentDate,
      id: jobId,
    };
    
    // Guardar datos en Excel
    saveToExcel(completeData);
    
    // Mostrar toast de confirmación
    toast({
      title: "Cotización enviada",
      description: "Te contactaremos pronto con los detalles de tu cotización.",
    });
    
    console.log("Formulario enviado:", completeData);
  };

  // Actualizar precio cada vez que cambian servicio o días
  useState(() => {
    if (watchService && watchDias) {
      const priceDetails = calculatePrice(watchService, watchDias);
      setPrice(priceDetails ? priceDetails.total : null);
    }
  });

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
            <p className="text-2xl font-bold text-daty-700">${price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">*Los posibles descuentos serán evaluados por la persona a cargo de tu proyecto.</p>
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
