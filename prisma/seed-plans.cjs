const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const plansData = [
  {
    courseId: 11, // UI/UX Dizayn va Figma Masterclass
    title: "Figma & UI/UX Masterclass Standart",
    description: "3 oylik to'liq UI/UX dizayn, UX tadqiqotlar, dizayn tizimlari va prototiplash dasturi",
    isDefault: true,
    lessons: [
      { lessonOrder: 1, topic: "UI/UX Asoslari: Dizayn fikrlash (Design Thinking)", description: "UX va UI farqlari, mahsulot yaratish bosqichlari" },
      { lessonOrder: 2, topic: "Figma bilan tanishuv: Interfeys, Frame va Asboblar", description: "Figma muhitini sozlash, asosiy vektor asboblari" },
      { lessonOrder: 3, topic: "Ranglar nazariyasi va Tipografika qoidalari", description: "Kontrast, ierarxiya, zamonaviy shrift juftliklari" },
      { lessonOrder: 4, topic: "Auto Layout asoslari va Flexbox tamoyillari", description: "Padding, gap, alignment va responsive komponentlar" },
      { lessonOrder: 5, topic: "Auto Layout chuqurlashtirilgan: Min/Max o'lchamlar", description: "Murakkab kartochkalar va menyular qurish" },
      { lessonOrder: 6, topic: "Figma Komponentlari va Variantlar (Variants)", description: "Reusability, tugmalar, formalar va holatlar (states)" },
      { lessonOrder: 7, topic: "Komponent xususiyatlari: Boolean, Text, Swap Instance", description: "Yangi komponent tizimi imkoniyatlari" },
      { lessonOrder: 8, topic: "Figma Variables: Rang va o'lcham tokenlari", description: "Design tokenlar, Dark mode va Light mode yaratish" },
      { lessonOrder: 9, topic: "UX Research: Foydalanuvchi intervyulari va Persona", description: "Target audience aniqlash, empathy map tuzish" },
      { lessonOrder: 10, topic: "User Journey Map va Information Architecture", description: "Foydalanuvchi yo'li va sayt xaritasi (sitemap)" },
      { lessonOrder: 11, topic: "Wireframing: Low-fidelity va High-fidelity eskizlar", description: "Struktura yaratish va tezkor g'oyalarni tekshirish" },
      { lessonOrder: 12, topic: "Mobile App Dizayni: iOS Human Interface Guidelines", description: "iOS standartlari, safe area, tab bar va navigatsiya" },
      { lessonOrder: 13, topic: "Mobile App Dizayni: Material Design 3 (Android)", description: "Material you tamoyillari va Android grid tizimi" },
      { lessonOrder: 14, topic: "Web Dashboard Dizayni: 12-ustunli Grid tizimi", description: "Katta ekranlar uchun ma'lumotlar jadvallari va widgetlar" },
      { lessonOrder: 15, topic: "E-commerce do'koni uchun UI yaratish", description: "Katalog, mahsulot kartasi va savatcha sahifalari" },
      { lessonOrder: 16, topic: "Forma va Inputlar UX dizayni", description: "Xatoliklar holati, validatsiya va qulay to'lov oqimi" },
      { lessonOrder: 17, topic: "Interaktiv Prototiplash: Smart Animate", description: "Sahifalararo silliq o'tishlar va mikro-harakatlar" },
      { lessonOrder: 18, topic: "Murakkab Prototiplash: Variables va Conditions", description: "Interaktiv savatcha, hisoblagich va forma prototipi" },
      { lessonOrder: 19, topic: "Dizayn Tizimi (Design System) yaratish: 1-qism", description: "Ranglar, tipografika va ikonalar kutubxonasi" },
      { lessonOrder: 20, topic: "Dizayn Tizimi (Design System) yaratish: 2-qism", description: "Murakkab komponentlar va dokumentatsiya yozish" },
      { lessonOrder: 21, topic: "Mikro-animatsiyalar va Loading holatlari", description: "Skeleton loaderlar, spinnerlar va mikro-interaksiyalar" },
      { lessonOrder: 22, topic: "Usability Testing: Prototipni foydalanuvchida tekshirish", description: "Test o'tkazish metodlari va dizaynni yaxshilash" },
      { lessonOrder: 23, topic: "Dizaynni dasturchilarga topshirish (Design Handoff)", description: "Figma Dev Mode, CSS eksport va spetsifikatsiyalar" },
      { lessonOrder: 24, topic: "Portfolio Tayyorlash: Behance va Dribbble Case Study", description: "Loyihani taqdim qilish va ishga kirish strategiyasi" },
    ],
  },
  {
    courseId: 11,
    title: "Mobile UI/UX Tezlashtirilgan Kurs",
    description: "Faqat mobil ilovalar (iOS va Android) uchun intensiv dizayn kursi",
    isDefault: false,
    lessons: [
      { lessonOrder: 1, topic: "Mobil ilovalar arxitekturasi va UX qoidalari", description: "Thumb zone, navigatsiya naqshlari" },
      { lessonOrder: 2, topic: "Figma: Mobil UI uchun Auto Layout va Grid", description: "Turli ekran o'lchamlari uchun adaptiv dizayn" },
      { lessonOrder: 3, topic: "iOS va Android UI komponentlar kutubxonasi", description: "Standart komponentlar va ularni sozlash" },
      { lessonOrder: 4, topic: "Fintech mobil ilovasi dizayni (Case study)", description: "O'tkazmalar, karta boshqaruvi va profil" },
      { lessonOrder: 5, topic: "Smart Animate bilan mobil prototip yaratish", description: "Bottom sheet, modal va swipe harakatlari" },
      { lessonOrder: 6, topic: "Mobil ilovani taqdimot qilish va mockup tayyorlash", description: "Portfolio uchun professional vizualizatsiya" },
    ],
  },
  {
    courseId: 7, // Frontend Dasturlash (Vue 3 / TypeScript)
    title: "Standart Vue 3 & TypeScript Dasturi (2026)",
    description: "Zamonaviy SPA ilovalar, Vue 3 Composition API, Pinia va TypeScript to'liq dasturi",
    isDefault: true,
    lessons: [
      { lessonOrder: 1, topic: "Frontend arxitekturasi: Zamonaviy web-ilovalar va Vite", description: "Vite muhiti, Node.js va npm paketi" },
      { lessonOrder: 2, topic: "TypeScript Asoslari: Tiplar, Interface va Type Alias", description: "Statik tiplash va xavfsiz kod yozish" },
      { lessonOrder: 3, topic: "Vue 3 Composition API: ref, reactive va reaktivlik", description: "Reaktiv ma'lumotlar bilan ishlash asoslari" },
      { lessonOrder: 4, topic: "Computed xossalari va Watchers (watch, watchEffect)", description: "Hisoblanuvchi parametrlar va reaktiv kuzatuv" },
      { lessonOrder: 5, topic: "Komponentlar arxitekturasi: Props va Emits", description: "Ota-bola komponentlar aloqasi va TypeScript typing" },
      { lessonOrder: 6, topic: "Slots va Dinamik Komponentlar", description: "Reusability va moslashuvchan UI komponentlar qurish" },
      { lessonOrder: 7, topic: "Vue Router 4: Dinamik marshrutlar va Guards", description: "Autentifikatsiya tekshiruvlari va sahifalar navigatsiyasi" },
      { lessonOrder: 8, topic: "Pinia Store: Global Holat Boshqaruvi", description: "State, getters, actions va modul tizimi" },
      { lessonOrder: 9, topic: "Axios va REST API: Interceptorlar va JWT Tokenlar", description: "Avtorizatsiya, xatoliklarni tutish va bearer token" },
      { lessonOrder: 10, topic: "WebSocket va Real-time bildirishnomalar", description: "Client-server doimiy ochiq aloqasi" },
      { lessonOrder: 11, topic: "Tailwind CSS bilan Zamonaviy UI Qurish", description: "Responsive grid, dark mode va Tailwind 4 imkoniyatlari" },
      { lessonOrder: 12, topic: "Amaliy Loyiha: ERP CRM Tizimi Dashboardi", description: "Jadvallar, statistik kartalar va filtrlar" },
    ],
  },
  {
    courseId: 8, // Backend Dasturlash (NestJS / PostgreSQL)
    title: "NestJS & PostgreSQL Enterprise Reja",
    description: "Microservices, Prisma ORM, JWT va Redis kesh tizimi",
    isDefault: true,
    lessons: [
      { lessonOrder: 1, topic: "NestJS Arxitekturasi: Modullar, Kontrollerlar va Servislar", description: "Dependency Injection (DI) tamoyili" },
      { lessonOrder: 2, topic: "PostgreSQL va Relyatsion Ma'lumotlar Bazasi Asoslari", description: "Normalizatsiya, foreign key va indekslar" },
      { lessonOrder: 3, topic: "Prisma ORM: Sxema, Migratsiyalar va Relatsiyalar", description: "One-to-many, many-to-many bog'lanishlar" },
      { lessonOrder: 4, topic: "Validation va DTO: class-validator va class-transformer", description: "So'rovlarni tekshirish va xatoliklar javobi" },
      { lessonOrder: 5, topic: "Autentifikatsiya: JWT, Refresh Token va Parollarni xesh qilish", description: "bcrypt va passport-jwt integratsiyasi" },
      { lessonOrder: 6, topic: "Avtorizatsiya va RBAC: Roles Guard va Dekoratorlar", description: "Admin, Ustoz va Talaba rollarini ajratish" },
      { lessonOrder: 7, topic: "WebSocket Gateway: Real-time Xabarnomalar", description: "Socket.IO va real-time hodisalar almashish" },
      { lessonOrder: 8, topic: "Redis Kesh va Fon Jarayonlari (BullMQ)", description: "Tezkor keshlash va kechiktirilgan vazifalar" },
    ],
  },
  {
    courseId: 9, // IELTS Intensive
    title: "IELTS 7.5+ Target Akademik Dastur",
    description: "Barcha 4 modul (Listening, Reading, Writing, Speaking) bo'yicha intensiv darslar",
    isDefault: true,
    lessons: [
      { lessonOrder: 1, topic: "IELTS Exam Overview & Diagnostic Assessment", description: "Scoring criteria and personal study plan" },
      { lessonOrder: 2, topic: "Listening Section 1 & 2: Form & Map Completion", description: "Spelling, numbers and spatial navigation" },
      { lessonOrder: 3, topic: "Reading Academic: Skimming, Scanning & Keywords", description: "True/False/Not Given mastery" },
      { lessonOrder: 4, topic: "Writing Task 1: Trends, Graphs & Comparisons", description: "Overview structure and data reporting language" },
      { lessonOrder: 5, topic: "Speaking Part 1 & 2: Fluency, Range & Idioms", description: "Speaking without hesitation and cue cards" },
      { lessonOrder: 6, topic: "Writing Task 2: Opinion & Discussion Essays", description: "Cohesion, coherence and paragraph architecture" },
    ],
  },
  {
    courseId: 10, // Python & Data Science
    title: "Python Data Science & AI Dasturi",
    description: "Ma'lumotlar tahlili, Pandas, NumPy va Mashinaviy o'rganish",
    isDefault: true,
    lessons: [
      { lessonOrder: 1, topic: "Python Asoslari va Algoritmlar", description: "Ma'lumotlar turlari, funksiyalar va OOP" },
      { lessonOrder: 2, topic: "NumPy: Ko'p o'lchovli massivlar bilan hisoblash", description: "Vektorlashgan hisob-kitoblar va operatsiyalar" },
      { lessonOrder: 3, topic: "Pandas: Dataframe tahlili va Tozalash", description: "Missing data, filtering va aggregation" },
      { lessonOrder: 4, topic: "Ma'lumotlarni Vizualizatsiya qilish: Matplotlib & Seaborn", description: "Grafiklar, trendlar va tahliliy xulosalar" },
      { lessonOrder: 5, topic: "Machine Learning: Regressiya va Klassifikatsiya", description: "Scikit-Learn bilan bashorat modellari tuzish" },
      { lessonOrder: 6, topic: "Amaliy Loyiha: Biznes analitika va AI bashorati", description: "Real ma'lumotlar ustida to'liq data pipeline" },
    ],
  },
];

async function main() {
  console.log("Seeding course plans...");
  for (const p of plansData) {
    const existing = await prisma.coursePlan.findFirst({
      where: { courseId: p.courseId, title: p.title },
    });
    if (!existing) {
      const plan = await prisma.coursePlan.create({
        data: {
          courseId: p.courseId,
          title: p.title,
          description: p.description,
          isDefault: p.isDefault,
          lessons: {
            create: p.lessons.map(l => ({
              lessonOrder: l.lessonOrder,
              topic: l.topic,
              description: l.description,
            })),
          },
        },
      });
      console.log(`Created plan: ${plan.title} (ID: ${plan.id}) with ${p.lessons.length} lessons`);
    } else {
      console.log(`Plan already exists: ${p.title} (ID: ${existing.id})`);
    }
  }

  // Update existing groups to have planId if null
  const groups = await prisma.group.findMany({ where: { planId: null } });
  for (const g of groups) {
    const defaultPlan = await prisma.coursePlan.findFirst({
      where: { courseId: g.courseId },
      orderBy: [{ isDefault: 'desc' }, { id: 'desc' }],
    });
    if (defaultPlan) {
      await prisma.group.update({
        where: { id: g.id },
        data: { planId: defaultPlan.id },
      });
      console.log(`Assigned plan ${defaultPlan.title} to group ${g.name}`);
    }
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
