
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
import { CurrencyCode, currencies, convertPrice, formatCurrency } from "@/services/currencyService";
import { saveQuote, getLocalQuotes } from "@/services/quoteService";

const services = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 15,
  },
  {
    id: 2,
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 9,
  },
  {
    id: 3,
    name: "PROYECTOS Y ESTRATEGIAS",
    price: 10,
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 15,
  },
  {
    id: 5,
    name: "VISUALIZADORES Y REPORTES",
    price: 9,
  },
  {
    id: 6,
    name: "INFORMES Y DOCUMENTACIÓN",
    price: 7,
  }
];

const formSchema = z.object({
  nombre: z.string().min(3, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  telefono: z.string().min(8, { message: "Teléfono inválido" }),
  servicio: z.string({ required_error: "Seleccione un servicio" }),
  dias: z.coerce.number().min(1, { message: "Debe ser al menos 1 día" }).max(60, { message: "Máximo 60 días" }),
  descripcion: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  moneda: z.string().default("USD"),
});

type FormValues = z.infer<typeof formSchema>;

const QuoteForm = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service");
  
  const [priceUSD, setPriceUSD] = useState<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [urgent, setUrgent] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
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
      moneda: "USD",
    },
  });

  const calculatePrice = (serviceId: string, days: number) => {
    const selectedService = services.find(s => s.id.toString() === serviceId);
    if (!selectedService) return null;

    let basePrice = selectedService.price;
    let urgencyFee = 0;

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

  const watchService = form.watch("servicio");
  const watchDias = form.watch("dias");
  const watchMoneda = form.watch("moneda");

  const onSubmit = async (values: FormValues) => {
    if (!priceUSD) return;
    
    const quoteId = `DATY-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const selectedService = services.find(s => s.id.toString() === values.servicio);
    const serviceName = selectedService ? selectedService.name : "Servicio desconocido";
    
    const quoteData = {
      id: quoteId,
      timestamp: Date.now(),
      nombre: values.nombre,
      email: values.email,
      telefono: values.telefono,
      servicio: values.servicio,
      servicioNombre: serviceName,
      dias: values.dias,
      descripcion: values.descripcion,
      precio: priceUSD,
      moneda: values.moneda as CurrencyCode,
      estado: "Pendiente",
      userId: null,
      photoURL: null
    };

    try {
      await saveQuote(quoteData);

      toast({
        title: "Solicitud enviada",
        description: `Se ha registrado tu solicitud con ID: ${quoteId}. Te contactaremos pronto con los detalles.`,
      });

      form.reset({
        nombre: "",
        email: "",
        telefono: "",
        servicio: "",
        dias: 7,
        descripcion: "",
        moneda: "USD",
      });

      setPriceUSD(null);
      setDisplayPrice(null);
    } catch (error) {
      console.error('Error al guardar la solicitud:', error);
      toast({
        title: "Error al enviar la solicitud",
        description: "Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (watchService && watchDias) {
      const priceDetails = calculatePrice(watchService, watchDias);
      const newPriceUSD = priceDetails ? priceDetails.total : null;
      setPriceUSD(newPriceUSD);
      
      if (newPriceUSD) {
        if (watchMoneda === 'USD') {
          setDisplayPrice(newPriceUSD);
        } else {
          const converted = convertPrice(newPriceUSD, watchMoneda as CurrencyCode);
          setDisplayPrice(converted);
        }
      }
    }
  }, [watchService, watchDias, watchMoneda]);

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
                  <Input placeholder="Tu número telefónico" {...field} />
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
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moneda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moneda</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCurrency(value as CurrencyCode);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Selecciona una moneda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

        {displayPrice && (
          <div className="bg-daty-50 p-4 rounded-md border border-daty-100">
            <h3 className="font-medium text-lg mb-1">Tu cotización:</h3>
            <p className="text-2xl font-bold text-daty-700">
              {formatCurrency(displayPrice, selectedCurrency)}
            </p>
            {selectedCurrency !== "USD" && (
              <p className="text-sm text-muted-foreground mt-1">
                Equivalente a ${priceUSD?.toFixed(2)} USD
              </p>
            )}
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
