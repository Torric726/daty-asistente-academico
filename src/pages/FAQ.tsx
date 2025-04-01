
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-lg md:max-w-2xl">
            Encuentra respuestas a las dudas más comunes sobre nuestros servicios.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="space-y-8">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="plazos">Plazos</TabsTrigger>
                  <TabsTrigger value="pagos">Pagos</TabsTrigger>
                  <TabsTrigger value="servicios">Servicios</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="general">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-2xl font-bold mb-6">Información General</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Qué es DATY?</AccordionTrigger>
                      <AccordionContent>
                        DATY es un servicio académico digital que ofrece apoyo a estudiantes universitarios en diversas áreas, 
                        desde análisis de datos hasta investigaciones y tesinas. Contamos con un equipo de profesionales 
                        especializados en diferentes campos académicos.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Cómo puedo solicitar un servicio?</AccordionTrigger>
                      <AccordionContent>
                        Puedes solicitar un servicio a través de nuestro formulario de cotización, donde deberás proporcionar 
                        los detalles de tu proyecto. Un asesor te contactará para confirmar la cotización y los siguientes pasos.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿El servicio es confidencial?</AccordionTrigger>
                      <AccordionContent>
                        Sí, garantizamos total confidencialidad de la información proporcionada y de los trabajos realizados. 
                        No compartimos datos ni contenido con terceros bajo ninguna circunstancia.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Puedo solicitar un servicio que no está en el catálogo?</AccordionTrigger>
                      <AccordionContent>
                        Sí, podemos crear soluciones personalizadas según tus necesidades específicas. Contacta con nosotros 
                        para discutir tu proyecto y te brindaremos una cotización adaptada a tus requerimientos.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>¿Cómo se asignan los asesores?</AccordionTrigger>
                      <AccordionContent>
                        Asignamos los asesores según su especialidad y experiencia, buscando siempre el mejor match para tu 
                        proyecto específico. Todos nuestros asesores tienen formación académica avanzada en sus respectivas áreas.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="plazos">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-2xl font-bold mb-6">Plazos de Entrega</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Cuál es el tiempo mínimo de entrega?</AccordionTrigger>
                      <AccordionContent>
                        El tiempo mínimo de entrega es de 24 horas, aunque esto conlleva un cargo adicional por urgencia. 
                        El plazo específico dependerá del tipo de servicio y la complejidad del proyecto.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Qué plazos recomiendan para los diferentes servicios?</AccordionTrigger>
                      <AccordionContent>
                        Recomendamos solicitar los trabajos con al menos 5-7 días de anticipación para tareas estándar. 
                        Para proyectos más extensos como tesis o investigaciones, sugerimos un mínimo de 15 días para 
                        garantizar la mejor calidad.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Qué pasa si necesitan más tiempo del acordado?</AccordionTrigger>
                      <AccordionContent>
                        En caso de que surja algún imprevisto que pueda afectar el plazo de entrega, nos comunicaremos 
                        contigo de inmediato para informarte y acordar una nueva fecha de entrega. En estos casos, podemos 
                        ofrecer compensaciones o descuentos.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Hay cargo adicional por entregas urgentes?</AccordionTrigger>
                      <AccordionContent>
                        Sí, los trabajos con plazos menores a 3 días tienen un cargo adicional de $20, mientras que aquellos 
                        con plazos entre 3 y 5 días tienen un cargo de $10. Esto se debe al esfuerzo extra requerido para 
                        cumplir con entregas aceleradas.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="pagos">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-2xl font-bold mb-6">Métodos de Pago</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Qué métodos de pago aceptan?</AccordionTrigger>
                      <AccordionContent>
                        Aceptamos los siguientes métodos de pago:
                        <ul className="list-disc pl-5 mt-2">
                          <li>Transferencia bancaria</li>
                          <li>Paypal</li>
                          <li>Depósito en tiendas de conveniencia</li>
                          <li>Mercado Pago</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Cómo funciona el sistema de pago?</AccordionTrigger>
                      <AccordionContent>
                        Trabajamos con un sistema de pago dividido: 50% de anticipo para iniciar el trabajo 
                        y 50% restante contra entrega. Una vez recibido el pago inicial, asignamos un asesor 
                        y comenzamos con el desarrollo del proyecto.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Ofrecen descuentos?</AccordionTrigger>
                      <AccordionContent>
                        Sí, ofrecemos un 20% de descuento en el primer trabajo que solicites con nosotros. 
                        También contamos con descuentos especiales para clientes recurrentes y para proyectos 
                        de gran volumen.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Qué sucede si no quedo satisfecho con el trabajo?</AccordionTrigger>
                      <AccordionContent>
                        Si no estás satisfecho con el trabajo entregado, tienes derecho a solicitar hasta 2 rondas 
                        de revisiones sin costo adicional. En caso de que aún no estés conforme, evaluaremos cada 
                        caso particular para ofrecerte una solución adecuada.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="servicios">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-2xl font-bold mb-6">Detalles de Servicios</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Qué incluyen los servicios?</AccordionTrigger>
                      <AccordionContent>
                        Todos nuestros servicios incluyen:
                        <ul className="list-disc pl-5 mt-2">
                          <li>Desarrollo del trabajo según tus especificaciones</li>
                          <li>Hasta 2 rondas de revisiones sin costo adicional</li>
                          <li>Entrega en el formato que requieras</li>
                          <li>Garantía de confidencialidad</li>
                          <li>Comunicación constante durante el proceso</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿En qué formatos entregan los trabajos?</AccordionTrigger>
                      <AccordionContent>
                        Entregamos los trabajos en el formato que necesites: Word, PDF, PowerPoint, Excel, 
                        LaTeX, o cualquier otro formato específico que requieras. También podemos proporcionar 
                        archivos editables para que puedas realizar modificaciones posteriores.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Puedo solicitar modificaciones después de la entrega?</AccordionTrigger>
                      <AccordionContent>
                        Sí, tienes derecho a solicitar hasta 2 rondas de revisiones sin costo adicional. 
                        Las revisiones deben solicitarse dentro de los 7 días posteriores a la entrega final. 
                        Revisiones adicionales pueden tener un costo extra dependiendo del alcance de los cambios.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Qué nivel académico cubren los servicios?</AccordionTrigger>
                      <AccordionContent>
                        Nuestros servicios cubren todos los niveles académicos universitarios, desde 
                        trabajos de licenciatura hasta tesis doctorales. Contamos con asesores 
                        especializados en diversas áreas y con diferentes niveles de formación académica.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>¿Realizan trabajos en otros idiomas?</AccordionTrigger>
                      <AccordionContent>
                        Principalmente trabajamos en español, pero también podemos realizar trabajos en inglés y 
                        otros idiomas según disponibilidad de nuestros asesores. Si necesitas un trabajo en otro 
                        idioma, consúltanos y verificaremos la disponibilidad.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold mb-4">¿No encontraste respuesta a tu pregunta?</h3>
              <p className="mb-6 text-muted-foreground">
                Contáctanos directamente y resolveremos todas tus dudas.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-daty-600 hover:bg-daty-700">
                  Enviar Mensaje
                </Button>
                <Button variant="outline">
                  Llamar Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default FAQ;
