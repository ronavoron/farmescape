import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Farm } from "@/types/farm";

interface BookingFormProps {
  farm: Farm;
  onSuccess: () => void;
}

export const BookingForm = ({ farm, onSuccess }: BookingFormProps) => {
  const { toast } = useToast();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    specialRequests: ""
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);
      const diffMs = outDate.getTime() - inDate.getTime();
      return Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)), 0);
    }
    return 0;
  };

  const totalCost = calculateNights() * farm.pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (calculateNights() < 1) {
      toast({
        variant: "destructive",
        title: "Проверьте даты",
        description: "Дата выезда должна быть позже даты заезда.",
      });
      return;
    }

    if (
      !Number.isInteger(adults) ||
      !Number.isInteger(children) ||
      adults < 1 ||
      children < 0 ||
      adults + children > farm.capacity
    ) {
      toast({
        variant: "destructive",
        title: "Проверьте количество гостей",
        description: `Вместимость фермы — до ${farm.capacity} гостей.`,
      });
      return;
    }

    toast({
      title: "Форма заполнена",
      description:
        `${farm.name}: ${calculateNights()} ночей, ` +
        `${totalCost.toLocaleString("ru-RU")} ₽. ` +
        "Это демонстрация: бронирование не создано, данные не отправлены.",
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-stone-600">
      Демоверсия: используйте тестовые данные.
      Форма проверяет заполнение и показывает стоимость,
      но не создаёт бронирование.
    </p>
      {/* ===== Инфо о ферме ===== */}
      <div className="bg-lime-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{farm.name}</h3>
        <p className="text-sm text-lime-700">{farm.location}</p>
        <p className="text-lg font-bold text-lime-800">
          {farm.pricePerNight.toLocaleString("ru-RU")} ₽ за ночь
        </p>
      </div>

      {/* ===== Имя и почта ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="guestName">Полное Имя *</Label>
          <Input
            id="guestName"
            required
            value={formData.guestName}
            onChange={e => handleInputChange("guestName", e.target.value)}
            placeholder="Введите ваше полное имя"
          />
        </div>
        <div>
          <Label htmlFor="guestEmail">Email *</Label>
          <Input
            id="guestEmail"
            type="email"
            required
            value={formData.guestEmail}
            onChange={e => handleInputChange("guestEmail", e.target.value)}
            placeholder="Введите ваш email"
          />
        </div>
      </div>

      {/* ===== Телефон ===== */}
      <div>
        <Label htmlFor="guestPhone">Телефон</Label>
        <Input
          id="guestPhone"
          type="tel"
          value={formData.guestPhone}
          onChange={e => handleInputChange("guestPhone", e.target.value)}
          placeholder="+7 (999) 123-45-67"
        />
      </div>

      {/* ===== Даты заезда/выезда ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="checkIn">Дата Заезда *</Label>
          <Input
            id="checkIn"
            type="date"
            required
            value={formData.checkIn}
            onChange={e => handleInputChange("checkIn", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <Label htmlFor="checkOut">Дата Выезда *</Label>
          <Input
            id="checkOut"
            type="date"
            required
            value={formData.checkOut}
            onChange={e => handleInputChange("checkOut", e.target.value)}
            min={formData.checkIn || new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      {/* ===== Взрослые и дети ===== */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="adults">Взрослых *</Label>
          <Input
            id="adults"
            type="number"
            min={1}
            max={farm.capacity}
            required
            value={adults}
            onChange={e => setAdults(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <Label htmlFor="children">Детей</Label>
          <Input
            id="children"
            type="number"
            min={0}
            max={farm.capacity - adults}
            value={children}
            onChange={e => setChildren(parseInt(e.target.value, 10))}
          />
        </div>
      </div>

      {/* ===== Особые пожелания ===== */}
      <div>
        <Label htmlFor="specialRequests">Особые пожелания</Label>
        <Textarea
          id="specialRequests"
          value={formData.specialRequests}
          onChange={e =>
            handleInputChange("specialRequests", e.target.value)
          }
          placeholder="Например, детская кроватка или ранний заезд"
          rows={3}
        />
      </div>

      {/* ===== Превью стоимости ===== */}
      {totalCost > 0 && (
        <div className="bg-stone-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span>Итого ({calculateNights()} ночей)</span>
            <span className="text-xl font-bold text-lime-700">
              {totalCost.toLocaleString("ru-RU")} ₽
            </span>
          </div>
          <p className="text-sm text-stone-500 mt-1">
            Окончательную цену подтвердит хозяин.
          </p>
        </div>
      )}

      {/* ===== Кнопка отправки ===== */}
      <Button
        type="submit"
        className="w-full bg-lime-900 hover:bg-lime-950"
      >
        Проверить заявку
      </Button>

    </form>
  );
};
