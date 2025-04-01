
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const ComoFunciona = () => {
  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cómo Funciona DATY</h1>
          <p className="text-lg md:max-w-2xl">
            Conoce el proceso paso a paso para obtener nuestros servicios académicos.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="border rounded-lg p-6 text-center">
                <div className="mx-auto bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-daty-700">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Solicitud</h3>
                <p className="text-muted-foreground">
                  Completa el formulario de cotización con los detalles de tu proyecto.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <div className="mx-auto bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-daty-700">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Confirmación</h3>
                <p className="text-muted-foreground">
                  Recibe la confirmación de precio y detalles por correo o teléfono.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <div className="mx-auto bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-daty-700">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Pago Inicial</h3>
                <p className="text-muted-foreground">
                  Realiza el pago del 50% para iniciar el trabajo.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6 text-center">
                <div className="mx-auto bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-daty-700">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Desarrollo</h3>
                <p className="text-muted-foreground">
                  Un asesor especializado trabajará en tu proyecto según tus requisitos.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <div className="mx-auto bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-daty-700">5</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Entrega</h3>
                <p className="text-muted-foreground">
                  Recibe tu trabajo terminado en el plazo acordado.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <div className="mx-auto bg-daty-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-daty-700">6</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Pago Final y Revisiones</h3>
                <p className="text-muted-foreground">
                  Realiza el pago final y solicita hasta 2 revisiones sin costo adicional.
                </p>
              </div>
            </div>
            
            <div className="mt-16 bg-daty-50 rounded-lg border p-8">
              <h2 className="text-2xl font-bold mb-6">Nuestra Garantía de Calidad</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="text-daty-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-medium">Entrega puntual</h3>
                        <p className="text-sm text-muted-foreground">
                          Garantizamos la entrega de tu trabajo en el plazo acordado.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="text-daty-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-medium">Asesores especializados</h3>
                        <p className="text-sm text-muted-foreground">
                          Todos nuestros asesores tienen formación académica avanzada.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="text-daty-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-medium">Confidencialidad</h3>
                        <p className="text-sm text-muted-foreground">
                          Garantizamos la confidencialidad de toda la información proporcionada.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="text-daty-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-medium">Revisiones gratuitas</h3>
                        <p className="text-sm text-muted-foreground">
                          Incluimos hasta 2 rondas de revisiones sin costo adicional.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="text-daty-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-medium">Formatos personalizables</h3>
                        <p className="text-sm text-muted-foreground">
                          Entregamos los trabajos en los formatos que necesites.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="text-daty-600 mt-1 mr-3 flex-shrink-0" size={20} />
                      <div>
                        <h3 className="font-medium">Satisfacción garantizada</h3>
                        <p className="text-sm text-muted-foreground">
                          Si no estás satisfecho, trabajaremos para mejorar el resultado.
                        </p>
                      </div>
                    </div>
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

export default ComoFunciona;
