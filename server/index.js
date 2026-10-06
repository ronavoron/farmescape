// ==========================================
// FarmEscape Backend Server
// ==========================================

// ===== 1. Загрузка переменных окружения =====
require("dotenv").config();

// Вывод конфигурации для отладки
console.log("=== Конфигурация сервера ===");
console.log("DATABASE_URL =", process.env.DATABASE_URL);
console.log("→ SMTP_USER =", process.env.SMTP_USER);
console.log("→ SMTP_PASS =", process.env.SMTP_PASS.replace(/./g, "*"));

// ===== 2. Импорт зависимостей =====
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const nodemailer = require("nodemailer");
// вот так подключаем новый OpenAI-клиент
const OpenAI = require("openai");

// ===== 3. Инициализация Express приложения =====
const app = express();
const PORT = process.env.PORT || 3000;

// ===== 4. Настройка OpenAI API =====
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

// ===== 5. Настройка базы данных PostgreSQL =====
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ===== 6. Настройка middleware =====
app.use(cors());
app.use(express.json());

// ==========================================
// API ENDPOINTS
// ==========================================

// ===== AI-чат консультант =====
app.post("/api/ai-chat", async (req, res) => {
  const requestId = Date.now(); // Уникальный ID для отслеживания запроса
  
  try {
    const { message } = req.body;
    
    console.log(`🔵 [${requestId}] Получен запрос к AI-чату:`, {
      timestamp: new Date().toISOString(),
      message: message?.substring(0, 100) + (message?.length > 100 ? '...' : ''),
      userIP: req.ip || req.connection.remoteAddress
    });
    
    // Создаем промпт для AI-консультанта
    const prompt = `Ты — вежливый AI-консультант FarmEscape. У нас в каталоге всего три фермы. Первая: Ферма Корневых. Удобства: домашняя атмосфера, ферма с животными, дегустации продуктов, семейные экскурсии, участие в быте. Еда и питание: свежее молоко и сметана, домашние сыры и масло, мясо птицы и говядины, натуральные яйца. 5000 рублей за ночь. Вместимость 6 гостей. Базовый. Истринский р-н, деревня Курово.
    Вторая: Экоферма Сытникъ. Наша история: Ферма СытникЪ — это семейное экохозяйство в сердце Шаховского района, где выращивают чистые продукты и живут в ритме природы. Удобства: домики-глэмпинг, костровая зона, фермерский быт, экопродукты, катание на лошадях. Еда и питание: домашнее молоко, яйца с фермы, сезонные овощи, традиционные блюда. 9000 рублей за ночь. Вместимость 8 гостей. Премиум комфорт. Д. Коротнево.
    Третья: Коза в сарафане. Наша история: Маленькая ферма под Коломной — сыр, душа и чай из самовара. Удобства: кормление животных, экскурсии с хозяином, теплый уют в любом сезоне, лужайка для пикника, удобные домики. Еда и питание: козий сыр, домашнее молоко и йогурт, брынза и халуми, мед и травяной чай. 12000 рублей за ночь. Вместимость 4 гостей. Люкс комфорт. п.Первомайский, Коломенский р-н. Пользователь может выбить ТОЛЬКО из этих трех ферм. Ты не должен придумывать ничего нового, должен пользоваться ТОЛЬКО той информацией, что я тебе дала. Старайся писать кратко и по делу. Вопрос пользователя: "${message}" `;

    console.log(`🚀 [${requestId}] Отправляем запрос к OpenAI API...`);
    const startTime = Date.now();

    // Отправляем запрос к OpenAI (v4+ синтаксис)
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: prompt },
        { role: "user",   content: message },
      ],
      temperature: 0.7,
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`✅ [${requestId}] Получен ответ от OpenAI:`, {
      duration: `${duration}ms`,
      tokensUsed: completion.usage?.total_tokens || 'unknown',
      model: completion.model
    });

    const reply = completion.choices[0].message.content;
    
    console.log(`📤 [${requestId}] Отправляем ответ клиенту:`, {
      replyLength: reply?.length || 0,
      timestamp: new Date().toISOString()
    });
    
    res.json({ reply });
    
  } catch (err) {
    console.error(`❌ [${requestId}] AI-chat error:`, {
      timestamp: new Date().toISOString(),
      error: err.message,
      code: err.code,
      type: err.type,
      stack: err.stack?.split('\n')[0] // Первая строка стека для краткости
    });

    // Специальная обработка ошибок лимитов
    if (err.message?.includes('rate limit') || err.code === 'rate_limit_exceeded') {
      console.warn(`🚨 [${requestId}] ПРЕВЫШЕН ЛИМИТ ЗАПРОСОВ К OPENAI!`);
      res.status(429).json({ reply: "Слишком много запросов. Попробуйте через минуту." });
    } else {
      res.status(500).json({ reply: "Ошибка AI-консультанта." });
    }
  }
});

// ===== Тестовый endpoint =====
app.get("/api/hello", (req, res) => {
  res.json({ message: "Привет с сервера!" });
});

// ===== Создание бронирования =====
app.post("/api/bookings", async (req, res) => {
  try {
    // Извлекаем данные из запроса
    const {
      farmId,
      checkIn,
      checkOut,
      adults,
      children,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
    } = req.body;

    // ===== Сохранение в базу данных =====
    const insertQuery = `
      INSERT INTO bookings
        (farm_id, check_in, check_out, adults, children, guest_name, guest_email, guest_phone, special_requests)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id, created_at
    `;
    
    const insertValues = [
      farmId,
      checkIn,
      checkOut,
      adults,
      children,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests || null,
    ];

    const { rows } = await pool.query(insertQuery, insertValues);
    const booking = rows[0];

    // ===== Настройка email транспорта =====
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ===== Отправка подтверждения на email =====
    await transporter.sendMail({
      from: `"FarmEscape" <${process.env.SMTP_USER}>`,
      to: guestEmail,
      subject: "Подтверждение бронирования на FarmEscape",
      html: `
        <h2>Здравствуйте, ${guestName}!</h2>
        <p>Ваш запрос на бронирование:</p>
        <ul>
          <li>Ферма: <strong>${farmId}</strong></li>
          <li>Заезд: <strong>${checkIn}</strong></li>
          <li>Выезд: <strong>${checkOut}</strong></li>
          <li>Взрослых: <strong>${adults}</strong></li>
          <li>Детей: <strong>${children}</strong></li>
        </ul>
        ${specialRequests ? `<p>Особые пожелания: ${specialRequests}</p>` : ""}
        <p>Спасибо за выбор FarmEscape! Мы свяжемся с вами в ближайшее время.</p>
      `,
    });

    // Возвращаем успешный ответ
    res.status(200).json({ success: true, booking });
    
  } catch (error) {
    console.error("❌ Ошибка в /api/bookings:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 🚀 ЗАПУСК СЕРВЕРА
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log("=== 🌾 FarmEscape Backend готов к работе! ===");
});
