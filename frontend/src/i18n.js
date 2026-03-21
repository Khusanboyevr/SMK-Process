import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      "app": {
        "title": "QMS Analitik Dasbord",
        "desc": "SMK tizimini intellektual jarayonlarga ajratish va hujjatlashtirish platformasi.",
        "navUpload": "1. Yuklash",
        "navProcess": "2. Tahlil",
        "navSummary": "3. Xulosa",
        "navCompare": "4. Taqqoslash",
        "navPDCA": "5. PDCA & IKP"
      },
      "upload": {
        "title": "1-Bosqich: Ma'lumotlarni Kiritish",
        "pdfTitle": "Korxona Maqolasi (PDF)",
        "pptxTitle": "Universitet Prezentatsiyasi (PPTX)",
        "dropText": "Faylni bu yerga tashlang yoki bosing",
        "ready": "Hujjatlar tayyormi?",
        "readyDesc": "AI yordamida ikkala tizimni tahlil qilishni boshlaymiz.",
        "start": "Tahlilni Boshlash"
      },
      "process": {
        "title": "AI Hujjatlarni O'qimoqda...",
        "desc": "Llama-3 matnlarni qayta ishlamoqda, jarayonlarni klassifikatsiya qilmoqda. Kuting."
      },
      "summary": {
        "title": "3-Bosqich: Asosiy Xulosalar",
        "next": "Taqqoslashga o'tish",
        "industry": "Sanoat",
        "university": "Universitet"
      },
      "compare": {
        "title": "4-Bosqich: Qiyosiy Tahlil",
        "next": "PDCA Modeliga o'tish",
        "crit": "Mezon",
        "uniCol": "KFU (Ta'lim)",
        "indCol": "Korxona (Sanoat)"
      },
      "pdca": {
        "title": "5-Bosqich: PDCA Modeli va IKP",
        "download": "IKP Yuklab Olish",
        "plan": "1. Boshqaruv (PLAN)",
        "do1": "2. Asosiy (DO)",
        "do2": "3. Yordamchi (DO)",
        "checkAct": "4. Sifat (CHECK/ACT)",
        "restart": "Yangi Tahlilni Boshlash"
      }
    }
  },
  ru: {
    translation: {
      "app": {
        "title": "Аналитическая панель СМК",
        "desc": "Платформа для интеллектуального разделения и документирования системы менеджмента качества.",
        "navUpload": "1. Загрузка",
        "navProcess": "2. Анализ",
        "navSummary": "3. Выводы",
        "navCompare": "4. Сравнение",
        "navPDCA": "5. PDCA и ИКП"
      },
      "upload": {
        "title": "Этап 1: Ввод данных",
        "pdfTitle": "Статья предприятия (PDF)",
        "pptxTitle": "Презентация университета (PPTX)",
        "dropText": "Перетащите файл сюда или нажмите",
        "ready": "Документы готовы?",
        "readyDesc": "Начнем анализ обеих систем с помощью ИИ.",
        "start": "Начать анализ"
      },
      "process": {
        "title": "ИИ читает документы...",
        "desc": "Модель Llama-3 обрабатывает тексты и классифицирует процессы. Пожалуйста, подождите."
      },
      "summary": {
        "title": "Этап 3: Основные выводы",
        "next": "Перейти к сравнению",
        "industry": "Промышленность",
        "university": "Университет"
      },
      "compare": {
        "title": "Этап 4: Сравнительный анализ",
        "next": "Перейти к модели PDCA",
        "crit": "Критерий",
        "uniCol": "КФУ (Образование)",
        "indCol": "Предприятие (Промышленность)"
      },
      "pdca": {
        "title": "Этап 5: Модель PDCA и ИКП",
        "download": "Скачать ИКП",
        "plan": "1. Управление (PLAN)",
        "do1": "2. Основные (DO)",
        "do2": "3. Вспомогательные (DO)",
        "checkAct": "4. Качество (CHECK/ACT)",
        "restart": "Начать новый анализ"
      }
    }
  },
  en: {
    translation: {
      "app": {
        "title": "QMS Analytics Dashboard",
        "desc": "Platform for intelligent decomposition and documentation of the Quality Management System.",
        "navUpload": "1. Upload",
        "navProcess": "2. Analysis",
        "navSummary": "3. Summary",
        "navCompare": "4. Compare",
        "navPDCA": "5. PDCA & IKP"
      },
      "upload": {
        "title": "Stage 1: Data Input",
        "pdfTitle": "Industry Article (PDF)",
        "pptxTitle": "University Presentation (PPTX)",
        "dropText": "Drop file here or click",
        "ready": "Documents ready?",
        "readyDesc": "Let's start analyzing both systems with AI.",
        "start": "Start Analysis"
      },
      "process": {
        "title": "AI is Reading Documents...",
        "desc": "Llama-3 model is processing texts and classifying processes. Please wait."
      },
      "summary": {
        "title": "Stage 3: Main Summaries",
        "next": "Go to Comparison",
        "industry": "Industry",
        "university": "University"
      },
      "compare": {
        "title": "Stage 4: Comparative Analysis",
        "next": "Go to PDCA Model",
        "crit": "Criterion",
        "uniCol": "KFU (Education)",
        "indCol": "Enterprise (Industry)"
      },
      "pdca": {
        "title": "Stage 5: PDCA Model and IKP",
        "download": "Download IKP",
        "plan": "1. Management (PLAN)",
        "do1": "2. Core (DO)",
        "do2": "3. Support (DO)",
        "checkAct": "4. Quality (CHECK/ACT)",
        "restart": "Start New Analysis"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
