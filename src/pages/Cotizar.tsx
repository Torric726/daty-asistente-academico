
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

const Cotizar = () => {
  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Solicita una Cotización</h1>
          <p className="text-lg md:max-w-2xl">
            Completa el formulario con los detalles de tu proyecto y recibe una cotización personalizada.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-daty-100 rounded-full p-3">
                  <div className="bg-daty-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-lg font-bold">%</span>
                  </div>
                </div>
              </div>
              <h2 className="text-center text-xl font-bold mb-2">Precios personalizados para tu proyecto</h2>
              <p className="text-center text-muted-foreground">
                Los descuentos y precios finales serán evaluados por el asesor asignado a tu proyecto.
              </p>
            </div>
            
            <QuoteForm />
            
            <div className="mt-12 bg-gray-50 rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Proceso de Cotización</h3>
              <ol className="space-y-3">
                <li className="flex">
                  <span className="bg-daty-100 text-daty-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <p>Completa el formulario con los detalles de tu proyecto.</p>
                </li>
                <li className="flex">
                  <span className="bg-daty-100 text-daty-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <p>Un asesor revisará la información y validará el precio.</p>
                </li>
                <li className="flex">
                  <span className="bg-daty-100 text-daty-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <p>Recibirás la confirmación por correo o teléfono.</p>
                </li>
                <li className="flex">
                  <span className="bg-daty-100 text-daty-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <p>Realiza el pago del 50% para iniciar el trabajo.</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Cotizar;
