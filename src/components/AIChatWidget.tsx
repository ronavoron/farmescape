// src/components/AIChatWidget.tsx
import { useEffect, useState } from "react";
import { Widget, addResponseMessage, toggleWidget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";


export const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    addResponseMessage(
      "Привет! Это демонстрационный чат FarmEscape. " +
      "Онлайн-консультации пока недоступны."
    );
  }, []);

  const handleNewUserMessage = () => {
    addResponseMessage(
      "Посмотрите карточки ферм: там указаны цены, вместимость и удобства. " +
      "Чтобы открыть фотографии и форму, нажмите «Подробности и Бронирование»."
    );
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as Element).closest(".rcw-header")) {
        toggleWidget();
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  
  const CustomLauncher = () => (
    <button
      onClick={() => {
        toggleWidget();
        setOpen(true);
      }}
      aria-label="Открыть чат"
      className="
        fixed bottom-6 right-6
        w-20 h-20
        rounded-full
        bg-lime-900
        p-0
        shadow-none
        cursor-pointer
        z-50
        animate-bounce
      "
      style={{
        backgroundImage: "url('/cow.png')",
        backgroundSize: "90% 90%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Помощник FarmEscape"
      subtitle="Демонстрационный чат"
      launcher={() => (open ? null : <CustomLauncher />)}
      launcherOpenLabel="Закрыть чат"
      launcherCloseLabel="Открыть чат"
      autofocus
    />
  );
};
