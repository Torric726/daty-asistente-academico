
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

// Lista completa de servicios
const services = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 15,
    description: "Encuestas y análisis, estadísticas descriptivas, análisis y limpieza de bases de datos, visualización de datos y gráficos personalizados, elaboración de reportes y consultas.",
    features: [
      "Encuestas y análisis",
      "Estadísticas descriptivas",
      "Análisis y limpieza de bases de datos",
      "Visualización de datos y gráficos personalizados",
      "Elaboración de reportes y consultas"
    ],
    popular: true
  },
  {
    id: 2,
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 9,
    description: "Resúmenes y esquemas, presentaciones y diapositivas, creación de formularios digitales, revisión y corrección de trabajos académicos.",
    features: [
      "Resúmenes y esquemas",
      "Presentaciones y diapositivas",
      "Creación de formularios digitales",
      "Revisión y corrección de trabajos académicos"
    ]
  },
  {
    id: 3,
    name: "PROYECTOS Y ESTRATEGIAS",
    price: 10,
    description: "Estudios de impacto, gestión de presupuestos, planificación y estrategias para eventos.",
    features: [
      "Estudios de impacto",
      "Gestión de presupuestos",
      "Planificación y estrategias para eventos"
    ]
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 15,
    description: "Desarrollo de proyectos de investigación, análisis y redacción de estudios, elaboración de tesinas, documentos en código LaTeX.",
    features: [
      "Desarrollo de proyectos de investigación",
      "Análisis y redacción de estudios",
      "Elaboración de tesinas",
      "Documentos en código LaTeX"
    ]
  },
  {
    id: 5,
    name: "VISUALIZADORES Y REPORTES",
    price: 9,
    description: "Comparativas y análisis de tendencias, tableros interactivos y dashboards, gráficos personalizados sin necesidad de programación, visualización de datos analíticos.",
    features: [
      "Comparativas y análisis de tendencias",
      "Tableros interactivos y dashboards",
      "Gráficos personalizados sin necesidad de programación",
      "Visualización de datos analíticos"
    ]
  },
  {
    id: 6,
    name: "INFORMES Y DOCUMENTACIÓN",
    price: 7,
    description: "Evaluaciones de impacto, síntesis y resúmenes de proyectos, revisión y corrección de documentos.",
    features: [
      "Evaluaciones de impacto",
      "Síntesis y resúmenes de proyectos",
      "Revisión y corrección de documentos"
    ]
  }
];

const Servicios = () => {
  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-lg md:max-w-2xl">
            Conoce todos nuestros servicios académicos digitales diseñados para ayudarte a destacar
            en tu trayectoria universitaria.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
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
        </div>
      </section>
      
      <section className="py-16 bg-daty-50">
        <div className="container px-4">
          <div className="md:flex items-start">
            <div className="md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold gradient-heading mb-4">Sobre nuestros servicios</h2>
              <p className="mb-4">
                En DATY, nos comprometemos a proporcionar servicios académicos de alta calidad
                que te ayuden a alcanzar tus metas educativas. Nuestro equipo está conformado
                por profesionales con formación académica avanzada en diversas áreas.
              </p>
              <p className="mb-4">
                Todos nuestros trabajos incluyen hasta 2 rondas de revisiones sin costo adicional,
                garantizando así tu satisfacción con el resultado final. Además, nos aseguramos de
                mantener la confidencialidad de toda la información que nos proporcionas.
              </p>
              <p>
                Para proyectos especiales o necesidades específicas que no encuentres en nuestro
                catálogo, no dudes en contactarnos. Podemos crear soluciones personalizadas
                adaptadas a tus requerimientos particulares.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-4">Preguntas frecuentes</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">¿Cuánto tiempo tarda la entrega?</h4>
                    <p className="text-sm text-muted-foreground">Los tiempos varían según el servicio y complejidad. El tiempo mínimo es de 24 horas (con cargo por urgencia).</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">¿Cómo se realiza el pago?</h4>
                    <p className="text-sm text-muted-foreground">Aceptamos transferencias bancarias, PayPal, depósitos en tiendas de conveniencia y Mercado Pago.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">¿Puedo solicitar cambios después de la entrega?</h4>
                    <p className="text-sm text-muted-foreground">Sí, todos los servicios incluyen hasta 2 rondas de revisiones sin costo adicional.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">¿Qué pasa si necesito más revisiones?</h4>
                    <p className="text-sm text-muted-foreground">Revisiones adicionales pueden tener un costo extra dependiendo del alcance de los cambios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Servicios;
