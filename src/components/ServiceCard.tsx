
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ServiceCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  details?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  price,
  description,
  features,
  popular = false,
  details,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className={`service-card relative border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow ${popular ? "border-daty-500 border-2" : ""}`}>
      {popular && (
        <Badge className="absolute -top-3 right-4 bg-daty-600">
          Más Popular
        </Badge>
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="mt-2 flex items-end">
        <span className="text-3xl font-bold text-daty-600">${price}</span>
        <span className="text-gray-500 ml-1">/ proyecto</span>
      </div>
      <p className="mt-3 text-muted-foreground">{description}</p>
      
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex">
            <Check size={16} className="text-daty-600 mt-0.5 flex-shrink-0" />
            <span className="ml-2 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button className="w-full bg-daty-600 hover:bg-daty-700">
          <Link to={`/cotizar?service=${id}`} className="w-full">
            Solicitar
          </Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
          Detalles
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>
              Información detallada sobre este servicio
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h4 className="font-medium text-lg mb-2">Descripción</h4>
            <p className="text-muted-foreground mb-4">
              {details || description}
            </p>
            
            <h4 className="font-medium text-lg mb-2">Características</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex">
                  <Check size={16} className="text-daty-600 mt-0.5 flex-shrink-0" />
                  <span className="ml-2 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 p-3 rounded bg-daty-50">
              <p className="text-sm font-medium">Precio base:</p>
              <p className="text-xl font-bold text-daty-700">${price} USD</p>
              <p className="text-xs text-muted-foreground">*El precio final puede variar según los requisitos específicos del proyecto</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cerrar
            </Button>
            <Button className="bg-daty-600 hover:bg-daty-700">
              <Link to={`/cotizar?service=${id}`}>
                Solicitar Cotización
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceCard;
