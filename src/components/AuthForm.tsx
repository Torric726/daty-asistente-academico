
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const userSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const adminSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type UserFormValues = z.infer<typeof userSchema>;
type AdminFormValues = z.infer<typeof adminSchema>;

const ADMIN_PASSWORD = "69512310Anacleta";

const AuthForm = () => {
  const [authType, setAuthType] = useState<"user" | "admin">("user");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
    },
  });
  
  const adminForm = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onUserSubmit = (values: UserFormValues) => {
    // Guardar información del usuario en localStorage
    const userData = {
      id: `user-${Date.now()}`,
      nombre: values.nombre,
      email: values.email,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem("datyCurrentUser", JSON.stringify(userData));
    
    // Obtener usuarios existentes o crear array vacío
    const existingUsers = JSON.parse(localStorage.getItem("datyUsers") || "[]");
    existingUsers.push(userData);
    localStorage.setItem("datyUsers", JSON.stringify(existingUsers));
    
    toast({
      title: "Registro exitoso",
      description: "Has iniciado sesión como usuario. Ahora puedes realizar cotizaciones.",
    });
    
    navigate("/cotizar");
  };
  
  const onAdminSubmit = (values: AdminFormValues) => {
    // Verificar contraseña de administrador
    if (values.password !== ADMIN_PASSWORD) {
      toast({
        title: "Error de autenticación",
        description: "Contraseña de administrador incorrecta.",
        variant: "destructive",
      });
      return;
    }
    
    // Guardar información del administrador en localStorage
    const adminData = {
      id: `admin-${Date.now()}`,
      email: values.email,
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem("datyCurrentUser", JSON.stringify(adminData));
    
    toast({
      title: "Acceso concedido",
      description: "Has iniciado sesión como administrador.",
    });
    
    navigate("/admin");
  };
  
  return (
    <div className="max-w-md mx-auto">
      <Tabs 
        defaultValue="user" 
        onValueChange={(value) => setAuthType(value as "user" | "admin")}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="user">Acceso Usuario</TabsTrigger>
          <TabsTrigger value="admin">Acceso Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="space-y-4 mt-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Registro de Usuario</h2>
            <p className="text-muted-foreground">Regístrate para solicitar cotizaciones</p>
          </div>
          
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
              <FormField
                control={userForm.control}
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
                control={userForm.control}
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
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-daty-600 hover:bg-daty-700">
                Registrarse
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="admin" className="space-y-4 mt-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Acceso Administrador</h2>
            <p className="text-muted-foreground">Ingresa para gestionar cotizaciones</p>
          </div>
          
          <Form {...adminForm}>
            <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
              <FormField
                control={adminForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@daty.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={adminForm.control}
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
              
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
