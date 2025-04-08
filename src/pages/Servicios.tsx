
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

// Lista completa de servicios con descripciones mejoradas
const services = [
  {
    id: 1,
    name: "ANÁLISIS DE DATOS",
    price: 15,
    description: "Extraemos valor de la información disponible, identificando tendencias, patrones y oportunidades ocultas que otros no pueden ver. Nuestro análisis profesional te dará ventaja competitiva.",
    features: [
      "Encuestas y análisis avanzados",
      "Estadísticas descriptivas e inferenciales",
      "Análisis y limpieza de bases de datos complejas",
      "Visualización de datos y gráficos personalizados",
      "Elaboración de reportes ejecutivos y consultas especializadas"
    ],
    popular: true,
    details: "Este servicio te permite obtener información valiosa a partir de tus datos, identificando tendencias que te darán ventaja sobre tu competencia. Utilizamos herramientas avanzadas para extraer insights que impulsen la toma de decisiones estratégicas, optimizando tus procesos y maximizando tus resultados. Perfecto para empresas que buscan mejorar su posición en el mercado o individuos con proyectos de investigación detallados."
  },
  {
    id: 2,
    name: "TAREAS Y TRABAJOS DIGITALES",
    price: 9,
    description: "Optimizamos tu contenido digital con soluciones profesionales. Desde resúmenes precisos hasta presentaciones impactantes, te ayudamos a destacar con materiales de alta calidad.",
    features: [
      "Resúmenes y esquemas profesionales",
      "Presentaciones y diapositivas impactantes",
      "Creación de formularios digitales interactivos",
      "Revisión y corrección de trabajos con estándares profesionales"
    ],
    details: "Este servicio te ofrece apoyo profesional para cualquier trabajo digital que necesites. Nuestro equipo de expertos crea contenido preciso, visualmente atractivo y de alta calidad, siguiendo los más altos estándares. Ideal para profesionales que necesitan materiales impecables para presentaciones importantes o empresas que requieren documentación técnica de calidad."
  },
  {
    id: 3,
    name: "PROYECTOS Y ESTRATEGIAS",
    price: 10,
    description: "Diseñamos planes estratégicos personalizados para maximizar el éxito de tus proyectos. Nuestras metodologías probadas garantizan resultados óptimos y medibles.",
    features: [
      "Estudios de impacto y viabilidad",
      "Gestión profesional de presupuestos",
      "Planificación estratégica para maximizar resultados"
    ],
    details: "Este servicio te proporciona estrategias detalladas para la planificación e implementación exitosa de proyectos. Evaluamos todos los factores relevantes para crear una hoja de ruta clara que maximice tus probabilidades de éxito. Perfecto para empresas que necesitan lanzar nuevos productos o servicios, o individuos con proyectos personales ambiciosos que requieren planificación estructurada."
  },
  {
    id: 4,
    name: "INVESTIGACIONES Y TESINAS",
    price: 15,
    description: "Realizamos investigaciones rigurosas con metodologías científicas. Nuestro equipo de profesionales garantiza documentos bien estructurados y con fundamentos sólidos.",
    features: [
      "Desarrollo de proyectos de investigación con metodología rigurosa",
      "Análisis y redacción de estudios científicos",
      "Elaboración de tesinas profesionales",
      "Documentos en código LaTeX con formato académico"
    ],
    details: "Este servicio ofrece soporte especializado para trabajos de investigación de alto nivel. Nuestro equipo de profesionales con formación académica avanzada aplica metodologías científicas rigurosas para desarrollar investigaciones completas, bien estructuradas y con conclusiones fundamentadas. Ideal para profesionales que necesitan estudios de mercado detallados o personas que requieren documentación científica de calidad."
  },
  {
    id: 5,
    name: "VISUALIZADORES Y REPORTES",
    price: 9,
    description: "Transformamos datos complejos en visualizaciones claras e intuitivas. Nuestros dashboards interactivos permiten ver la información que realmente importa para tomar mejores decisiones.",
    features: [
      "Comparativas y análisis de tendencias visuales",
      "Tableros interactivos y dashboards profesionales",
      "Gráficos personalizados sin necesidad de programación",
      "Visualización de datos analíticos para toma de decisiones"
    ],
    details: "Este servicio transforma tus datos complejos en visualizaciones claras e interactivas que facilitan la comprensión y la toma de decisiones. Nuestras soluciones de visualización te permiten identificar tendencias, patrones y oportunidades que podrían pasar desapercibidas en datos crudos. Perfecto para empresas que necesitan monitorear KPIs o profesionales que quieren presentar información compleja de manera accesible."
  },
  {
    id: 6,
    name: "INFORMES Y DOCUMENTACIÓN",
    price: 7,
    description: "Creamos documentación profesional con estándares internacionales. Nuestros informes están diseñados para comunicar información compleja de manera clara y efectiva.",
    features: [
      "Evaluaciones de impacto detalladas",
      "Síntesis y resúmenes ejecutivos de proyectos",
      "Revisión y corrección de documentos técnicos"
    ],
    details: "Este servicio ofrece la creación de documentación profesional con los más altos estándares de calidad. Elaboramos informes claros, concisos y estructurados que comunican efectivamente información compleja a cualquier audiencia. Ideal para empresas que necesitan documentación técnica, informes anuales o cualquier tipo de documento que requiera un nivel profesional de presentación y contenido."
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
            Conoce todos nuestros servicios profesionales de análisis y procesamiento de datos
            diseñados para potenciar tu negocio o proyecto.
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
                details={service.details}
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
                En DATY, nos comprometemos a proporcionar servicios profesionales de alta calidad
                que te ayuden a alcanzar tus objetivos. Nuestro equipo está conformado
                por profesionales con formación avanzada en diversas áreas.
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
