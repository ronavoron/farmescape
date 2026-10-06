// src/components/Reviews.tsx
import { Star } from "lucide-react";

interface Review {
  author: string;
  text: string;
  rating: number; // от 1 до 5
}

const reviews: Review[] = [
  { author: "Анна П.", text: "Невероятный отдых, дети в восторге!", rating: 5 },
  { author: "Игорь С.", text: "Очень уютное место и тишина.", rating: 4 },
  { author: "Екатерина Л.", text: "Супер завтрак, фермерский мед — бомба!", rating: 5 },
  // можно добавить ещё отзывы
];

export const Reviews = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-8">
          Отзывы наших гостей
        </h2>
        <p className="text-stone-500 mb-8">
          Отзывы приведены для демонстрации интерфейса.
        </p>
        <ul className="space-y-8 mb-8">
          {reviews.map((r, i) => (
            <li key={i} className="text-left">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-5 w-5 ${
                      idx < r.rating ? "text-yellow-400" : "text-stone-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-stone-700 italic mb-1">“{r.text}”</p>
              <p className="text-sm font-semibold text-stone-900">
                — {r.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
