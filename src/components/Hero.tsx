import "./Hero.css";

export const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-black/60"
        style={{
          backgroundImage: "url('/images/photo3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-wrapper">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ночи на ферме
          </h1>

          <p className="text-xl text-stone-100 mb-8 max-w-3xl mx-auto">
            Отдохните на семейных фермах Подмосковья.
            <br />
            Уютные домики, природа и знакомство с фермерской жизнью.
          </p>

          <button
            className="custom-button"
            onClick={() =>
              document
                .getElementById("farms")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Выбрать ферму
          </button>
        </div>
      </div>
    </section>
  );
};