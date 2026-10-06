import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star } from "lucide-react";
import { Farm } from "@/types/farm";

interface FarmCardProps {
  farm: Farm;
  onBookingClick: (farm: Farm) => void;
}

export const FarmCard = ({ farm, onBookingClick }: FarmCardProps) => {
  const getComfortColor = (level: string) => {
    switch (level) {
      case 'Basic': return 'bg-lime-100 text-lime-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Luxury': return 'bg-purple-100 text-purple-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const translateComfortLevel = (level: string) => {
    switch (level) {
      case 'Basic': return 'Базовый';
      case 'Premium': return 'Премиум';
      case 'Luxury': return 'Люкс';
      default: return level;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={farm.images[0]} 
          alt={farm.name}
          className="w-full h-48 object-cover"
        />
        <Badge className={`absolute top-4 left-4 ${getComfortColor(farm.comfortLevel)}`}>
          {translateComfortLevel(farm.comfortLevel)}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-stone-900">{farm.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-lime-900">
              {farm.pricePerNight.toLocaleString("ru-RU")} ₽
            </div>
            <div className="text-sm text-stone-500">за ночь</div>
          </div>
        </div>
        <div className="flex items-center text-stone-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {farm.location}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-stone-600 text-sm line-clamp-2">{farm.shortStory}</p>
        
        <div className="flex items-center justify-between text-sm text-stone-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            До {farm.capacity} гостей
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            4.8
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {farm.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {farm.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{farm.amenities.length - 3} ещё
            </Badge>
          )}
        </div>

        <Button 
          className="w-full bg-lime-900 hover:bg-lime-950"
          onClick={() => onBookingClick(farm)}
        >
          Подробности и Бронирование
        </Button>
      </CardContent>
    </Card>
  );
};
