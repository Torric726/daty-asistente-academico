
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300 bg-card">
      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-daty-100 text-daty-600 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
