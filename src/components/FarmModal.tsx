import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "./BookingForm";
import { Farm } from "@/types/farm";
import { MapPin, Users, Utensils, Star, ArrowLeft, ArrowRight } from "lucide-react";

interface FarmModalProps {
  farm: Farm;
  isOpen: boolean;
  onClose: () => void;
}

export const FarmModal = ({ farm, isOpen, onClose }: FarmModalProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getComfortColor = (level: string) => {
    switch (level) {
      case "Basic":
        return "bg-lime-100 text-lime-800";
      case "Premium":
        return "bg-blue-100 text-blue-800";
      case "Luxury":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const translateComfortLevel = (level: string) => {
    switch (level) {
      case "Basic":
        return "Базовый";
      case "Premium":
        return "Премиум";
      case "Luxury":
        return "Люкс";
      default:
        return level;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % farm.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + farm.images.length) % farm.images.length);
  };

  if (showBookingForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowBookingForm(false)} className="p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              Забронируйте Ваш Отдых в {farm.name}
            </DialogTitle>
          </DialogHeader>
          <BookingForm farm={farm} onSuccess={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{farm.name}</DialogTitle>
          <div className="flex items-center text-stone-600">
            <MapPin className="h-4 w-4 mr-1" />
            {farm.location}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Галерея */}
          <div className="relative">
            <img
              src={farm.images[currentImageIndex]}
              alt={farm.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            <Badge className={`absolute top-4 left-4 ${getComfortColor(farm.comfortLevel)}`}>
              {translateComfortLevel(farm.comfortLevel)} Комфорт
            </Badge>

            {farm.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {farm.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Информация */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Наша История</h3>
                <p className="text-stone-600">{farm.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Удобства</h3>
                <div className="grid grid-cols-2 gap-2">
                  {farm.amenities.map((amenity) => (
                    <Badge
                      key={amenity}
                      className="bg-stone-100 text-stone-800 rounded-full px-4 py-1 text-sm font-medium"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Еда и Питание</h3>
                <div className="grid grid-cols-1 gap-2">
                  {farm.foodOfferings.map((offering) => (
                    <div key={offering} className="flex items-center text-stone-600">
                      <Utensils className="h-4 w-4 mr-2" />
                      {offering}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-stone-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-lime-900 mb-1">
                  {farm.pricePerNight.toLocaleString("ru-RU")} ₽
                </div>
                <div className="text-sm text-stone-500 mb-4">за ночь</div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-stone-600">
                      <Users className="h-4 w-4 mr-2" />
                      Вместимость
                    </div>
                    <span className="font-medium">{farm.capacity} гостей</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-stone-600">
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      Рейтинг
                    </div>
                    <span className="font-medium">4.8 (12 отзывов)</span>
                  </div>
                </div>

                <Button className="w-full bg-lime-900 hover:bg-lime-950" onClick={() => setShowBookingForm(true)}>
                  Запросить Бронирование
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
