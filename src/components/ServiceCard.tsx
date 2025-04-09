
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  price,
  description,
  features,
  popular = false,
}) => {
  return (
    <div className={`service-card relative ${popular ? "border-daty-500 border-2" : ""}`}>
      {popular && (
        <Badge className="absolute -top-3 right-4 bg-daty-600">
          Más Popular
        </Badge>
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="mt-2 flex items-end">
        <span className="text-3xl font-bold text-daty-600">${price}</span>
        <span className="text-gray-500 ml-1">USD</span>
      </div>
      <p className="mt-3 text-muted-foreground">{description}</p>
      
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            <Check size={16} className="text-daty-600 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 flex space-x-2">
        <Button className="w-full bg-daty-600 hover:bg-daty-700">
          <Link to={`/cotizar?service=${id}`} className="w-full">
            Solicitar
          </Link>
        </Button>
        <Button variant="outline" className="w-full">
          <Link to={`/servicios/${id}`} className="w-full">
            Detalles
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
