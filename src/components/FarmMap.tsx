import { FC } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Farm } from "@/types/farm";

interface FarmMapProps {
  farms: Farm[];
  onSelect: (farm: Farm) => void;
}

export const FarmMap: FC<FarmMapProps> = ({ farms, onSelect }) => {
  // Центрируем карту на первой ферме (если она есть)
  const defaultCenter = farms.length
    ? [farms[0].latitude, farms[0].longitude]
    : [55.75, 37.57]; // Москва по умолчанию

  return (
    <div className="h-[500px] w-full mb-8 rounded overflow-hidden">
      <YMaps query={{ apikey: "ВАШ_ЯНДЕКС_API_КЛЮЧ", lang: "ru_RU" }}>
        <Map
          defaultState={{ center: defaultCenter, zoom: 5 }}
          width="100%"
          height="100%"
        >
          {farms.map((farm) => (
            <Placemark
              key={farm.id}
              geometry={[farm.latitude, farm.longitude]}
              properties={{
                hintContent: farm.name,
                balloonContent: `<strong>${farm.name}</strong><br/>${farm.pricePerNight.toLocaleString("ru-RU")} ₽ за ночь`,
              }}
              // При клике по метке открываем модалку с деталями
              onClick={() => onSelect(farm)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};
