
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, Award, CheckCircle, Users, LineChart, FileText, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceCard from "@/components/ServiceCard";

// Servicios destacados
const featuredServices = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 50,
    description: "Procesamiento y análisis de datos para proyectos profesionales y de investigación.",
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
    price: 40,
    description: "Desarrollo de contenido digital para diferentes proyectos.",
    features: [
      "Resúmenes y esquemas",
      "Presentaciones y diapositivas",
      "Creación de formularios digitales",
      "Revisión de trabajos profesionales"
    ]
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 70,
    description: "Apoyo en el desarrollo y redacción de proyectos de investigación.",
    features: [
      "Desarrollo de proyectos",
      "Análisis y redacción",
      "Elaboración de tesinas",
      "Documentos en código LaTeX"
    ]
  }
];

// Características principales
const features = [
  {
    icon: Clock,
    title: "Entregas Puntuales",
    description: "Garantizamos la entrega de tus trabajos en el tiempo acordado, sin retrasos."
  },
  {
    icon: Award,
    title: "Calidad Profesional",
    description: "Trabajos desarrollados por especialistas con formación avanzada en cada área."
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

// Testimonios
const testimonials = [
  {
    name: "María López",
    role: "Analista de Datos",
    content: "DATY me ayudó con un proyecto crucial cuando estaba con poco tiempo. El resultado fue excelente y me permitió aprender mucho del proceso.",
    rating: 5
  },
  {
    name: "Carlos Mendoza",
    role: "Ingeniero de Sistemas",
    content: "El análisis de datos que me proporcionaron fue fundamental para mi investigación. El equipo es muy profesional y entrega justo lo que se necesita.",
    rating: 5
  },
  {
    name: "Alejandra Ruiz",
    role: "Consultora de Proyectos",
    content: "Excelente servicio y comunicación constante. Me gustó mucho que me explicaron todo el proceso y me mantuvieron informada.",
    rating: 4
  }
];

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-daty-900 to-daty-700 text-white py-16 md:py-24">
        <div className="container px-4 md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Tu Asistente Digital Profesional
            </h1>
            <p className="text-lg md:text-xl mb-8 md:max-w-md">
              Servicios profesionales de análisis y gestión de datos. Soluciones a la medida para tus proyectos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-white text-daty-800 hover:bg-gray-100">
                <Link to="/cotizar">Solicitar Cotización</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-daty-600">
                <Link to="/servicios">
                  Ver Servicios
                  <ChevronRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
              <h2 className="text-xl font-bold mb-4">Precios Personalizados</h2>
              <p className="mb-4">Consulta con uno de nuestros asesores para evaluar posibles descuentos según tu proyecto.</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-400" /> Trabajo personalizado
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-400" /> Asesores expertos
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-400" /> Garantía de calidad
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Servicios Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Nuestros Servicios Destacados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones digitales profesionales para ayudarte a destacar en tus proyectos.
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
      
      {/* Características */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Por qué elegir DATY</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contamos con un equipo de profesionales dedicados a brindarte el mejor servicio.
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
      
      {/* Cómo funciona */}
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
      
      {/* Testimonios */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personas que han confiado en nuestros servicios y han logrado destacar en sus proyectos.
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
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-daty-700 to-daty-500 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Solicita una cotización ahora y obtén una evaluación personalizada de tu proyecto.
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
