import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, Award, CheckCircle, Users, LineChart, FileText, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceCard from "@/components/ServiceCard";

const featuredServices = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 15,
    description: "Procesamiento y análisis de datos para proyectos académicos y de investigación.",
    features: [
      "Encuestas y análisis",
      "Estadísticas descriptivas",
      "Visualización de datos",
      "Elaboración de reportes"
    ],
    popular: true
  },
  {
    id: 2,
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 9,
    description: "Desarrollo de contenido digital para diferentes asignaturas y proyectos.",
    features: [
      "Resúmenes y esquemas",
      "Presentaciones y diapositivas",
      "Creación de formularios digitales",
      "Revisión de trabajos académicos"
    ]
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 15,
    description: "Apoyo en el desarrollo y redacción de proyectos de investigación académica.",
    features: [
      "Desarrollo de proyectos",
      "Análisis y redacción",
      "Elaboración de tesinas",
      "Documentos en código LaTeX"
    ]
  }
];

const features = [
  {
    icon: Clock,
    title: "Entregas Puntuales",
    description: "Garantizamos la entrega de tus trabajos en el tiempo acordado, sin retrasos."
  },
  {
    icon: Award,
    title: "Calidad Académica",
    description: "Trabajos desarrollados por especialistas con formación académica avanzada."
  },
  {
    icon: CheckCircle,
    title: "Revisiones Gratuitas",
    description: "Incluimos hasta 2 rondas de revisiones sin costo adicional."
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Cada proyecto es asignado a un consultor especializado en tu área."
  }
];

const testimonials = [
  {
    name: "María López",
    role: "Estudiante de Administración",
    content: "DATY me ayudó con un proyecto crucial cuando estaba con poco tiempo. El resultado fue excelente y me permitió aprender mucho del proceso.",
    rating: 5
  },
  {
    name: "Carlos Mendoza",
    role: "Estudiante de Ingeniería",
    content: "El análisis de datos que me proporcionaron fue fundamental para mi tesis. El equipo es muy profesional y entrega justo lo que se necesita.",
    rating: 5
  },
  {
    name: "Alejandra Ruiz",
    role: "Estudiante de Psicología",
    content: "Excelente servicio y comunicación constante. Me gustó mucho que me explicaron todo el proceso y me mantuvieron informada.",
    rating: 4
  }
];

const Index = () => {
  return (
    <>
      <Navbar />
      
      <section className="hero-section min-h-[70vh] flex items-center bg-gradient-to-br from-daty-700 to-daty-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Servicios Profesionales de Análisis y Gestión de Datos
              </h1>
              <p className="text-xl mb-8 text-daty-100">
                Soluciones digitales especializadas para individuos, empresas y proyectos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-daty-500 hover:bg-daty-600">
                  <Link to="/servicios">Ver Servicios</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/como-funciona">Cómo Funciona</Link>
                </Button>
              </div>
              <div className="mt-6 p-4 bg-white/10 rounded-lg text-sm">
                <p className="font-medium">Nota: Cualquier descuento será evaluado y aplicado por el asesor que quede a cargo de su proyecto.</p>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="Servicios de Análisis de Datos" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Nuestros Servicios Destacados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones académicas digitales para ayudarte a destacar en tu carrera universitaria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                price={service.price}
                description={service.description}
                features={service.features}
                popular={service.popular}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/servicios">
                Ver todos los servicios
                <ChevronRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Por qué elegir DATY</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contamos con un equipo de profesionales dedicados a brindarte el mejor servicio académico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-daty-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Cómo Funciona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proceso simple y transparente para obtener el servicio que necesitas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-daty-700">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Solicita una Cotización</h3>
              <p className="text-muted-foreground">
                Completa el formulario con los detalles de tu proyecto y recibe una cotización personalizada.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-daty-700">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Asignación de Asesor</h3>
              <p className="text-muted-foreground">
                Te asignamos un asesor especializado que trabajará en tu proyecto según tus requisitos.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-daty-700">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Entrega y Revisión</h3>
              <p className="text-muted-foreground">
                Recibe tu trabajo terminado en el plazo acordado y solicita revisiones si es necesario.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-daty-600 hover:bg-daty-700">
              <Link to="/como-funciona">
                Más información
                <ChevronRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estudiantes que han confiado en nuestros servicios y han logrado destacar en sus proyectos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-daty-700 to-daty-500 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Solicita una cotización ahora y obtén un 20% de descuento en tu primer trabajo.
          </p>
          <Button size="lg" asChild className="bg-white text-daty-800 hover:bg-gray-100">
            <Link to="/cotizar">Solicitar Cotización Ahora</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
