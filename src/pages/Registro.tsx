
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

const Registro = () => {
  return (
    <>
      <Navbar />
      
      <section className="bg-daty-700 text-white py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Acceso a la Plataforma</h1>
          <p className="text-lg md:max-w-2xl">
            Regístrate para solicitar cotizaciones o accede como administrador para gestionar solicitudes.
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
                    <span className="text-lg font-bold">D</span>
                  </div>
                </div>
              </div>
              <h2 className="text-center text-xl font-bold mb-2">Acceso a DATY</h2>
              <p className="text-center text-muted-foreground">
                Si eres usuario, regístrate para poder solicitar cotizaciones. 
                Si eres administrador, ingresa con tus credenciales.
              </p>
            </div>
            
            <AuthForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Registro;
