import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "./LoginModal";
import "./Header.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navItems: [string, string][] = [
    ["features", "О Нас"],
    ["farms",    "Выбрать ферму"],
    ["reviews",  "Отзывы"],
    ["hosting",  "Стать партнёром"],
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    if (id === "hosting") {
      setIsLoginOpen(true);
    } else {
      scrollTo(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <div className="flex-none">
              <h1 className="text-2xl font-bold text-white whitespace-nowrap">FarmEscape</h1>
            </div>
            {/* Десктоп-меню */}
            <div className="flex-1 flex justify-center px-4">
              <nav className="hidden md:flex justify-center w-full max-w-[600px] lg:space-x-10 md:space-x-6 sm:space-x-4 overflow-hidden">
                {navItems.map(([id, label]) => (
                  <button
                    key={id}
                    className="nav-link btn-one whitespace-nowrap"
                    onClick={() => handleNavClick(id)}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Кнопки «Контакты» */}
            <div className="flex-none hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                className="text-black border-white hover:bg-stone-200 hover:text-black"
                onClick={() => scrollTo("footer")}  // Якорь на футер
              >
                Контакты
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden p-8 rounded-lg bg-stone-900 space-y-4">
              {navItems.map(([id, label]) => (
                <button
                  key={id}
                  className="block text-white hover:text-lime-700"
                  onClick={() => handleNavClick(id)}
                >
                  {label}
                </button>
              ))}

              <div className="pt-4 space-y-2">
                <Button
                  className="w-full bg-lime-900 hover:bg-lime-950 text-white"
                  onClick={() => {
                    scrollTo("footer");
                    setIsMenuOpen(false);
                  }}
                >
                  Контакты
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Модалка входа/регистрации */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};
