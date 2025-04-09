
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const userSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.enum(["user", "admin"]),
  password: z.string().optional(),
});

type FormValues = z.infer<typeof userSchema>;

const ADMIN_PASSWORD = "69512310Anacleta";

const AuthForm = () => {
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombre: "",
      email: "",
      role: "user",
      password: "",
    },
  });
  
  const watchRole = form.watch("role");
  
  // Show/hide password field based on role selection
  const handleRoleChange = (value: string) => {
    if (value === "admin") {
      setShowAdminPassword(true);
    } else {
      setShowAdminPassword(false);
      form.setValue("password", "");
    }
  };
  
  const onSubmit = (values: FormValues) => {
    // Verificar contraseña de administrador si es necesario
    if (values.role === "admin" && values.password !== ADMIN_PASSWORD) {
      toast({
        title: "Error de autenticación",
        description: "Contraseña de administrador incorrecta.",
        variant: "destructive",
      });
      return;
    }
    
    // Crear objeto de usuario/admin
    const userData = {
      id: `${values.role}-${Date.now()}`,
      nombre: values.nombre,
      email: values.email,
      role: values.role,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem("datyCurrentUser", JSON.stringify(userData));
    
    // Obtener usuarios existentes o crear array vacío
    const existingUsers = JSON.parse(localStorage.getItem("datyUsers") || "[]");
    existingUsers.push(userData);
    localStorage.setItem("datyUsers", JSON.stringify(existingUsers));
    
    toast({
      title: values.role === "admin" ? "Acceso concedido" : "Registro exitoso",
      description: values.role === "admin" 
        ? "Has iniciado sesión como administrador." 
        : "Has iniciado sesión como usuario. Ahora puedes realizar cotizaciones.",
    });
    
    navigate(values.role === "admin" ? "/admin" : "/cotizar");
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Registro de Cuenta</h2>
        <p className="text-muted-foreground">Elige tu tipo de cuenta para continuar</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Tipo de cuenta</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRoleChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="user" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Usuario (solicitar cotizaciones)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Administrador (gestionar solicitudes)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showAdminPassword && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña de administrador</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button type="submit" className="w-full bg-daty-600 hover:bg-daty-700">
            {watchRole === "admin" ? "Ingresar como Administrador" : "Registrarse como Usuario"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
