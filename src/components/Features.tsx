import { Leaf, Home, Utensils, Calendar } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-lime-900" />,
      title: "Гармония с природой",
      description:
        "Погрузитесь в атмосферу загородной жизни: участвуйте в экологичных практиках, пробуйте свежие органические продукты с фермы и дышите чистым воздухом.",
    },
    {
      icon: <Home className="h-8 w-8 text-lime-900" />,
      title: "Комфорт в мелочах",
      description:
        "Мы лично проверяем каждое жильё — вас ждёт уют, продуманный интерьер и аутентичные впечатления от сельского быта.",
    },
    {
      icon: <Utensils className="h-8 w-8 text-lime-900" />,
      title: "Вкус фермы на вашем столе",
      description:
        "Наслаждайтесь блюдами, приготовленными из сезонных продуктов, которые собрали буквально у вас на глазах.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-lime-900" />,
      title: "Бронируйте легко и быстро",
      description:
        "Гибкие условия бронирования и прямое общение с хозяевами ферм — ваш отдых будет именно таким, как вы мечтали.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="features-title text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Почему стоит выбрать FarmEscape?
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Уютное жильё, фермерские продукты и время на природе —
            для спокойного отдыха за городом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-stone-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
