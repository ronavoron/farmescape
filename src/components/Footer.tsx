// src/components/Footer.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "./LoginModal";

export const Footer = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <footer id="footer" className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Описание */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">FarmEscape</h3>
              <p className="text-stone-300 mb-4">
                Ждем в гости, уставших от городских будней.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-stone-400">Для хозяев ферм:</p>
                <Button
                  variant="outline"
                  className="text-lime-900 border-lime-900 hover:bg-lime-900 hover:text-white"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Стать партнером
                </Button>
              </div>
            </div>

            {/* Быстрые ссылки */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Быстрые Ссылки</h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#farms" className="hover:text-white transition-colors">
                    Выбрать ферму
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    О Нас
                  </a>
                </li>
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-stone-300">
                <li>guliciya2004@gmail.com</li>
                <li>+7 (910) 487-FARM</li>
                <li>МФТИ, Москва, Россия</li>
              </ul>
            </div>
          </div>

          {/* Копирайт */}
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <p>&copy; 2025 FarmEscape</p>
          </div>
        </div>
      </footer>

      {/* Модалка регистрации фермера */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};
