import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  // Включает поддержку тёмной темы по классу (например, class="dark")
  darkMode: ["class"],

  // Пути ко всем файлам, где Tailwind должен искать классы
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

  // Префикс для Tailwind-классов (не используется — оставлено пустым)
  prefix: "",

  theme: {
    // Настройки контейнера (например, для `.container`)
    container: {
      center: true,                // Центрирует контейнер по горизонтали
      padding: '2rem',            // Внутренний отступ
      screens: {
        '2xl': '1400px'           // Максимальная ширина на больших экранах
      }
    },

    extend: {
      // Дополнительные цвета
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },

        // Специальная палитра для боковой панели
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },

      // Радиусы скругления на основе переменной --radius
      borderRadius: {
        lg: 'var(--radius)',                    // Большой радиус
        md: 'calc(var(--radius) - 2px)',        // Средний
        sm: 'calc(var(--radius) - 4px)'         // Маленький
      },

      // Кастомные анимации для раскрывающихся блоков (например, accordion)
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },

  // Подключение плагинов
  plugins: [animate],
} satisfies Config;
