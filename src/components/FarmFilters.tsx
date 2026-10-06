import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface Guests {
  adults: number;
  children: number;
}

interface FarmFiltersProps {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: Guests;
  view: "list" | "map";
  onChangeCheckIn: (d: Date | null) => void;
  onChangeCheckOut: (d: Date | null) => void;
  onChangeGuests: (g: Guests) => void;
  onChangeView: (v: "list" | "map") => void;
  onSearch: () => void;
}

export const FarmFilters: FC<FarmFiltersProps> = ({
  checkIn,
  checkOut,
  guests,
  view,
  onChangeCheckIn,
  onChangeCheckOut,
  onChangeGuests,
  onChangeView,
  onSearch,
}) => {
  // Локальные счётчики, пока пользователь не нажал «Готово»
  const [localGuests, setLocalGuests] = useState<Guests>(guests);
  const [showGuestsPanel, setShowGuestsPanel] = useState(false);

  const applyGuests = () => {
    onChangeGuests(localGuests);
    setShowGuestsPanel(false);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end relative">
      {/* Заезд */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Заезд</label>
        <DatePicker
          selected={checkIn}
          onChange={onChangeCheckIn}
          placeholderText="Выберите дату"
          className="border rounded px-3 py-2 bg-white"
        />
      </div>

      {/* Выезд */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Выезд</label>
        <DatePicker
          selected={checkOut}
          onChange={onChangeCheckOut}
          placeholderText="Выберите дату"
          className="border rounded px-3 py-2 bg-white"
        />
      </div>

      {/* Гости */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Гости</label>
        <button
          type="button"
          onClick={() => setShowGuestsPanel((v) => !v)}
          className="border rounded px-3 py-2 text-left w-48 bg-white"
        >
          {guests.adults} взрослых, {guests.children} детей
        </button>

        {showGuestsPanel && (
          <div className="absolute bg-white border border-stone-200 rounded-lg shadow-lg p-4 mt-1 z-20 w-64">
            <div className="grid grid-cols-2 gap-4">
              {/* Счётчик взрослых */}
              <div className="flex flex-col items-center border border-stone-300 rounded-lg p-2">
                <span className="text-sm mb-2">Взрослые</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLocalGuests((g) => ({
                        ...g,
                        adults: Math.max(1, g.adults - 1),
                      }))
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded bg-white hover:bg-stone-50"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center">{localGuests.adults}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setLocalGuests((g) => ({
                        ...g,
                        adults: g.adults + 1,
                      }))
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded bg-white hover:bg-stone-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Счётчик детей */}
              <div className="flex flex-col items-center border border-stone-300 rounded-lg p-2">
                <span className="text-sm mb-2">Дети</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLocalGuests((g) => ({
                        ...g,
                        children: Math.max(0, g.children - 1),
                      }))
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded bg-white hover:bg-stone-50"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center">{localGuests.children}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setLocalGuests((g) => ({
                        ...g,
                        children: g.children + 1,
                      }))
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded bg-white hover:bg-stone-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Готово */}
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={applyGuests}
                className="px-4 py-2 bg-lime-900 text-white rounded"
              >
                Готово
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Кнопка Найти */}
      <button
        type="button"
        onClick={onSearch}
        className="px-6 py-2 bg-lime-900 text-white rounded"
      >
        Найти
      </button>

      {/* Переключатель списка / карты */}
      <div className="ml-auto flex items-center space-x-2">
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            view === "list"
              ? "bg-lime-900 text-white"
              : "bg-white text-stone-700 border"
          }`}
          onClick={() => onChangeView("list")}
        >
          Списком
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            view === "map"
              ? "bg-lime-900 text-white"
              : "bg-white text-stone-700 border"
          }`}
          onClick={() => onChangeView("map")}
        >
          На карте
        </button>
      </div>
    </div>
  );
};
