
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Información detallada de los servicios con precios actualizados
const serviceDetails = [
  {
    id: "1",
    name: "ANÁLISIS DE DATOS",
    price: 15,
    description: "Transformamos datos en información valiosa para tu empresa o proyecto.",
    longDescription: "Nuestro servicio de análisis de datos permite identificar tendencias, patrones y oportunidades que otros no ven. Utilizamos técnicas avanzadas de análisis estadístico y visualización para transformar datos complejos en información accionable que impulse la toma de decisiones estratégicas.",
    features: [
      "Encuestas y análisis detallados",
      "Estadísticas descriptivas e inferenciales",
      "Análisis y limpieza de bases de datos",
      "Visualización de datos y gráficos personalizados",
      "Elaboración de reportes y consultas",
      "Identificación de tendencias y oportunidades"
    ],
    benefits: [
      "Toma decisiones basadas en datos objetivos",
      "Identifica oportunidades de crecimiento o mejora",
      "Comprende mejor a tus clientes o usuarios",
      "Optimiza procesos y recursos",
      "Sustenta tus estrategias con evidencia sólida"
    ],
    useCases: [
      "Estudios de mercado y análisis de competencia",
      "Evaluación de rendimiento y KPIs",
      "Segmentación de clientes",
      "Análisis predictivo para proyecciones",
      "Investigación científica y social"
    ]
  },
  {
    id: "2",
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 8,
    description: "Resúmenes, presentaciones y trabajos digitales de alta calidad.",
    longDescription: "Nuestro equipo de profesionales se encarga de elaborar todo tipo de tareas y trabajos digitales con estándares de calidad profesional. Desde resúmenes concisos hasta presentaciones impactantes, nos aseguramos de que tus entregables destaquen por su precisión, claridad y presentación.",
    features: [
      "Resúmenes y esquemas concisos",
      "Presentaciones y diapositivas visuales",
      "Creación de formularios digitales",
      "Revisión y corrección de trabajos",
      "Documentación técnica y manuales",
      "Conversión de formatos (PDF, Word, Excel, etc.)"
    ],
    benefits: [
      "Ahorra tiempo en tareas repetitivas",
      "Garantiza documentos de calidad profesional",
      "Obtén materiales visualmente atractivos",
      "Asegura la precisión de la información",
      "Recibe entregables listos para usar"
    ],
    useCases: [
      "Preparación de materiales para presentaciones",
      "Documentación para proyectos empresariales",
      "Materiales para capacitaciones",
      "Informes ejecutivos y de gestión",
      "Contenido para sitios web o blogs"
    ]
  },
  {
    id: "3",
    name: "PROYECTOS Y ESTRATEGIAS",
    price: 7,
    description: "Desarrollo de proyectos y estrategias para impulsar tu negocio o iniciativa.",
    longDescription: "Diseñamos y desarrollamos proyectos a medida y estrategias efectivas para convertir tus ideas en realidades concretas. Nuestro enfoque metodológico y orientado a resultados te ayuda a definir objetivos claros, establecer planes de acción y optimizar recursos para alcanzar el éxito en tus iniciativas.",
    features: [
      "Estudios de impacto y viabilidad",
      "Gestión de presupuestos y recursos",
      "Planificación estratégica",
      "Desarrollo de modelos de negocio",
      "Estrategias de implementación",
      "Indicadores de seguimiento y evaluación"
    ],
    benefits: [
      "Convierte ideas en proyectos estructurados",
      "Optimiza recursos y minimiza riesgos",
      "Establece metas claras y medibles",
      "Mejora tus procesos de toma de decisiones",
      "Aumenta las probabilidades de éxito"
    ],
    useCases: [
      "Lanzamiento de nuevos productos o servicios",
      "Expansión de negocios",
      "Optimización de procesos internos",
      "Planes de marketing o comunicación",
      "Proyectos de innovación o transformación"
    ]
  },
  {
    id: "4",
    name: "INVESTIGACIONES Y TESINAS",
    price: 15,
    description: "Investigaciones académicas y profesionales con rigor metodológico.",
    longDescription: "Realizamos investigaciones detalladas y tesinas con el más alto rigor metodológico y académico. Nuestro equipo de especialistas domina diversas áreas del conocimiento y metodologías de investigación para ofrecerte documentos bien fundamentados, con fuentes confiables y análisis profundos que respalden tus proyectos.",
    features: [
      "Desarrollo de proyectos de investigación",
      "Revisión bibliográfica exhaustiva",
      "Análisis y redacción de estudios",
      "Elaboración de tesinas y monografías",
      "Documentos en código LaTeX",
      "Referencias y citaciones en diversos formatos"
    ],
    benefits: [
      "Obtén información basada en evidencias",
      "Fundamenta tus proyectos con rigor científico",
      "Accede a análisis metodológicamente sólidos",
      "Recibe documentos con valor académico",
      "Mejora la calidad de tus trabajos profesionales"
    ],
    useCases: [
      "Investigación de mercados",
      "Estudios de factibilidad",
      "Análisis de casos de éxito",
      "Fundamentación de proyectos",
      "Estudios científicos o técnicos"
    ]
  },
  {
    id: "5",
    name: "VISUALIZADORES Y REPORTES",
    price: 8,
    description: "Visualizaciones de datos y reportes interactivos que comunican efectivamente.",
    longDescription: "Transformamos datos complejos en visualizaciones claras e intuitivas que facilitan la comprensión y comunicación de información. Creamos dashboards interactivos, gráficos personalizados y reportes visuales que te permiten identificar patrones, tendencias y relaciones que impulsan mejores decisiones.",
    features: [
      "Comparativas y análisis de tendencias",
      "Tableros interactivos y dashboards",
      "Gráficos personalizados sin programación",
      "Visualización de datos analíticos",
      "Reportes automatizados",
      "Exportación en múltiples formatos"
    ],
    benefits: [
      "Comunica información compleja de forma visual",
      "Facilita la interpretación de grandes volúmenes de datos",
      "Identifica patrones y relaciones no evidentes",
      "Mejora la toma de decisiones basada en datos",
      "Crea reportes profesionales e impactantes"
    ],
    useCases: [
      "Reportes ejecutivos y de gestión",
      "Presentación de resultados de investigación",
      "Seguimiento de indicadores de desempeño",
      "Análisis de datos de marketing o ventas",
      "Monitoreo de proyectos o procesos"
    ]
  },
  {
    id: "6",
    name: "INFORMES Y DOCUMENTACIÓN",
    price: 5,
    description: "Informes profesionales y documentación detallada para tus proyectos.",
    longDescription: "Elaboramos informes y documentación profesional con el nivel de detalle y formalidad que tus proyectos requieren. Desde informes ejecutivos concisos hasta documentación técnica exhaustiva, nos aseguramos de que cada documento cumpla con los más altos estándares de calidad, claridad y precisión.",
    features: [
      "Evaluaciones de impacto",
      "Síntesis y resúmenes de proyectos",
      "Revisión y corrección de documentos",
      "Documentación técnica y de procesos",
      "Manuales de usuario o instructivos",
      "Informes de resultados y recomendaciones"
    ],
    benefits: [
      "Presenta información de manera profesional",
      "Documenta adecuadamente procesos y proyectos",
      "Mejora la comunicación interna y externa",
      "Facilita la gestión del conocimiento",
      "Garantiza la consistencia de la información"
    ],
    useCases: [
      "Documentación de proyectos",
      "Informes de resultados",
      "Manuales técnicos o de procedimientos",
      "Reportes para stakeholders",
      "Documentación normativa o regulatoria"
    ]
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceDetails.find(s => s.id === id);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Servicio no encontrado</h1>
          <p className="mb-6">El servicio que buscas no existe o ha sido removido.</p>
          <Button asChild>
            <Link to="/servicios">Ver todos los servicios</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/servicios" className="text-daty-100 hover:text-white text-sm">
              Servicios
            </Link>
            <span>/</span>
            <span className="text-sm">{service.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>
          <p className="text-lg md:max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 gradient-heading">Sobre este servicio</h2>
              
              <div className="prose max-w-none">
                <p className="text-lg mb-6">{service.longDescription}</p>
                
                <h3 className="text-xl font-medium mt-8 mb-4">Características principales</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-medium mt-8 mb-4">Beneficios</h3>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-medium mt-8 mb-4">Casos de uso</h3>
                <ul className="space-y-2">
                  {service.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">{service.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-daty-600">${service.price}</span>
                  <span className="text-gray-500 ml-1">USD</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                    <span>Hasta 2 rondas de revisión</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                    <span>Asesoramiento personalizado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                    <span>Entrega en formato digital</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-daty-600 mt-1 flex-shrink-0" />
                    <span>Confidencialidad garantizada</span>
                  </div>
                </div>
                
                <Button asChild className="w-full bg-daty-600 hover:bg-daty-700 mb-3">
                  <Link to={`/cotizar?service=${service.id}`}>
                    Solicitar cotización
                  </Link>
                </Button>
                
                <p className="text-sm text-center text-muted-foreground">
                  El asesor asignado evaluará descuentos aplicables
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ServiceDetail;
