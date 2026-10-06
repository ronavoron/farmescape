import { useState } from "react";
import { FarmCard } from "./FarmCard";
import { FarmModal } from "./FarmModal";
import { mockFarms } from "@/data/farms";
import { Farm } from "@/types/farm";
import { FarmFilters, Guests } from "./FarmFilters";
import { FarmMap } from "./FarmMap";

export const FarmGrid = () => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  // Фильтры
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });
  const [view, setView] = useState<"list" | "map">("list");

  // Отфильтрованные фермы
  const [filteredFarms, setFilteredFarms] = useState<Farm[]>(mockFarms);

  // Поиск по вместимости (и можно добавить даты)
  const handleSearch = () => {
    const result = mockFarms.filter(
      (f) => f.capacity >= guests.adults + guests.children
    );
    setFilteredFarms(result);
  };

  const handleBookingClick = (farm: Farm) => {
    setSelectedFarm(farm);
  };


  return (
    <section id="farms" className="py-16 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Выберите ферму
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Посмотрите фотографии, сравните условия проживания и выберите место для поездки.
          </p>
        </div>

        {/* Фильтры + переключатель List/Map */}
        <FarmFilters
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          view={view}
          onChangeCheckIn={setCheckIn}
          onChangeCheckOut={setCheckOut}
          onChangeGuests={setGuests}
          onChangeView={setView}
          onSearch={handleSearch}
        />

        {/* Список или Карта */}
        {view === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFarms.length === 0 && (
              <p className="col-span-full text-center text-stone-600 py-8">
                Нет ферм для такого количества гостей.
                Попробуйте уменьшить число гостей.
              </p>
            )}
            {filteredFarms.map((farm) => (
              <FarmCard
                key={farm.id}
                farm={farm}
                onBookingClick={handleBookingClick}
              />
            ))}
          </div>
        ) : (
          <FarmMap
            farms={filteredFarms}
            onSelect={handleBookingClick}
          />
        )}

        {/* Модалка с деталями */}
        {selectedFarm && (
          <FarmModal
            farm={selectedFarm}
            isOpen={!!selectedFarm}
            onClose={() => setSelectedFarm(null)}
          />
        )}
      </div>
    </section>
  );
};
