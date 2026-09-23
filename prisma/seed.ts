import { PrismaClient, WeekDay, AttendanceStatus, HomeworkSubmissionStatus, PaymentType, PaymentStatus, CoinReason, Status, GroupStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Helper: Sanani YYYY-MM-DD formatida olish
function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

// Hafta kunlari bo'yicha berilgan oraliqdagi barcha dars sanalarini hisoblash
function calculateLessonDates(startDate: Date, endDate: Date, daysOfWeek: WeekDay[]): Date[] {
  const dayMap: Record<WeekDay, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const targetDays = daysOfWeek.map((d) => dayMap[d]);
  const dates: Date[] = [];
  const current = new Date(startDate.getTime());

  while (current <= endDate) {
    if (targetDays.includes(current.getDay())) {
      dates.push(new Date(current.getTime()));
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

async function main() {
  console.log('🌱 Real ma\'lumotlar bilan ma\'lumotlar bazasini to\'ldirish (Seeding) boshlandi...');

  // Eski chala va noto'g'ri sanali ma'lumotlarni tozalash
  console.log('🧹 Eski ma\'lumotlar tozalanmoqda...');
  await prisma.prizeOrder.deleteMany();
  await prisma.coinTransaction.deleteMany();
  await prisma.prize.deleteMany();
  await prisma.homeworkSubmission.deleteMany();
  await prisma.homework.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.lessonMaterial.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.groupStudent.deleteMany();
  await prisma.groupTeacher.deleteMany();
  await prisma.group.deleteMany();
  await prisma.courseSyllabus.deleteMany();
  await prisma.course.deleteMany();
  await prisma.room.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.user.deleteMany();

  const standardPassword = await bcrypt.hash('123456', 10);
  const superadminPassword = await bcrypt.hash('Kuchli@Parol99', 10);

  // ==========================================
  // 1. FOYDALANUVCHILAR (USERS)
  // ==========================================
  console.log('👤 Foydalanuvchilar yaratilmoqda...');

  const superadmin = await prisma.user.create({
    data: {
      firstName: 'Humoyun',
      lastName: 'Superadmin',
      role: 'SUPERADMIN',
      phone: '+998900000001',
      email: 'one.humoyun@gmail.com',
      password: superadminPassword,
      address: 'Toshkent sh., Yunusobod tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  const admin1 = await prisma.user.create({
    data: {
      firstName: 'Sanjar',
      lastName: 'Aliyev',
      role: 'ADMIN',
      phone: '+998901234567',
      email: 'admin@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Mirzo Ulug\'bek tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      firstName: 'Nilufar',
      lastName: 'Sobirova',
      role: 'ADMIN',
      phone: '+998907778899',
      email: 'nilufar@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Yakkasaroy tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  // O'qituvchilar
  const teacherFrontend = await prisma.user.create({
    data: {
      firstName: 'Rustam',
      lastName: 'Qodirov',
      role: 'TEACHER',
      phone: '+998931112233',
      email: 'teacher@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Shayxontohur tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  const teacherEnglish = await prisma.user.create({
    data: {
      firstName: 'Dilnoza',
      lastName: 'Karimova',
      role: 'TEACHER',
      phone: '+998942223344',
      email: 'dilnoza@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Chilonzor tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  const teacherBackend = await prisma.user.create({
    data: {
      firstName: 'Alisher',
      lastName: 'Zokirov',
      role: 'TEACHER',
      phone: '+998935554411',
      email: 'alisher.backend@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Olmazor tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  const teacherDesign = await prisma.user.create({
    data: {
      firstName: 'Malika',
      lastName: 'Yo\'ldosheva',
      role: 'TEACHER',
      phone: '+998974443322',
      email: 'malika.design@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Mirobod tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  const teacherDataScience = await prisma.user.create({
    data: {
      firstName: 'Bekzod',
      lastName: 'Toirov',
      role: 'TEACHER',
      phone: '+998998881122',
      email: 'bekzod.ai@nyver.uz',
      password: standardPassword,
      address: 'Toshkent sh., Yashnobod tumani',
      status: 'ACTIVE',
      coins: 0,
    },
  });

  // Talabalar
  const studentsData = [
    { firstName: 'Jasur', lastName: 'Bekmirzayev', phone: '+998971239988', email: 'student@nyver.uz', coins: 145, address: 'Toshkent sh., Olmazor tumani' },
    { firstName: 'Madina', lastName: 'Umarova', phone: '+998915556677', email: 'madina@nyver.uz', coins: 120, address: 'Toshkent sh., Mirzo Ulug\'bek tumani' },
    { firstName: 'Bobur', lastName: 'Saidov', phone: '+998993334455', email: 'bobur@nyver.uz', coins: 95, address: 'Toshkent sh., Sergeli tumani' },
    { firstName: 'Sardor', lastName: 'Rahimov', phone: '+998901112244', email: 'sardor.r@gmail.com', coins: 110, address: 'Toshkent sh., Yunusobod tumani' },
    { firstName: 'Shahlo', lastName: 'Karimova', phone: '+998932223355', email: 'shahlo.k@gmail.com', coins: 160, address: 'Toshkent sh., Chilonzor tumani' },
    { firstName: 'Javohir', lastName: 'Shukurov', phone: '+998943334466', email: 'javohir.sh@gmail.com', coins: 85, address: 'Toshkent sh., Uchtepa tumani' },
    { firstName: 'Kamron', lastName: 'Alimov', phone: '+998954445577', email: 'kamron.alimov@gmail.com', coins: 130, address: 'Toshkent sh., Shayxontohur tumani' },
    { firstName: 'Aziza', lastName: 'Qosimova', phone: '+998975556688', email: 'aziza.q@gmail.com', coins: 90, address: 'Toshkent sh., Yakkasaroy tumani' },
    { firstName: 'Farrux', lastName: 'Yusupov', phone: '+998996667799', email: 'farrux.y@gmail.com', coins: 115, address: 'Toshkent sh., Mirobod tumani' },
    { firstName: 'Nilufar', lastName: 'Toirova', phone: '+998917778800', email: 'nilufar.t@gmail.com', coins: 105, address: 'Toshkent sh., Bektemir tumani' },
    { firstName: 'Ulug\'bek', lastName: 'Ergashev', phone: '+998908889911', email: 'ulugbek.e@gmail.com', coins: 70, address: 'Toshkent sh., Yashnobod tumani' },
    { firstName: 'Mohira', lastName: 'Ahmedova', phone: '+998939990022', email: 'mohira.a@gmail.com', coins: 140, address: 'Toshkent sh., Olmazor tumani' },
  ];

  const students: any[] = [];
  for (const st of studentsData) {
    const user = await prisma.user.create({
      data: {
        ...st,
        role: 'STUDENT',
        password: standardPassword,
        status: 'ACTIVE',
      },
    });
    students.push(user);
  }

  console.log(`✅ ${students.length + 8} ta haqiqiy foydalanuvchi yaratildi`);

  // ==========================================
  // 2. XONALAR (ROOMS)
  // ==========================================
  console.log('🏢 Xonalar yaratilmoqda...');
  const room1 = await prisma.room.create({
    data: { name: 'Xona #101 (Frontend Lab)', capacity: 16 },
  });
  const room2 = await prisma.room.create({
    data: { name: 'Xona #102 (Backend Server Room)', capacity: 14 },
  });
  const room3 = await prisma.room.create({
    data: { name: 'Xona #201 (Linguistics Hall)', capacity: 20 },
  });
  const room4 = await prisma.room.create({
    data: { name: 'Xona #202 (Data Science & AI Lab)', capacity: 16 },
  });
  const room5 = await prisma.room.create({
    data: { name: 'Xona #301 (Design Studio)', capacity: 18 },
  });

  // ==========================================
  // 3. KURSLAR VA O'QUV DASTURLARI (COURSES & SYLLABUS)
  // ==========================================
  console.log('📚 Kurslar va o\'quv rejalari yaratilmoqda...');

  const courseFrontend = await prisma.course.create({
    data: {
      name: 'Frontend Dasturlash (Vue 3 / TypeScript)',
      description: 'Zamonaviy Single Page Application (SPA), Vue 3 Composition API, Pinia, Tailwind CSS va TypeScript chuqur o\'rgatiladi.',
      price: 850000,
      durationMonths: 4,
      lessonsPerMonth: 12,
      totalLessons: 48,
    },
  });

  const courseBackend = await prisma.course.create({
    data: {
      name: 'Backend Dasturlash (NestJS / PostgreSQL)',
      description: 'Yuqori yuklamali tizimlar, microservices arxitekturasi, Prisma ORM, JWT autentifikatsiya, Redis va Docker containerization.',
      price: 950000,
      durationMonths: 5,
      lessonsPerMonth: 12,
      totalLessons: 60,
    },
  });

  const courseEnglish = await prisma.course.create({
    data: {
      name: 'IELTS Intensive (Band 7.5+)',
      description: 'Speaking, Writing (Task 1 & 2), Reading va Listening bo\'yicha xalqaro standartdagi chuqurlashtirilgan tayyorgarlik kursi.',
      price: 750000,
      durationMonths: 3,
      lessonsPerMonth: 12,
      totalLessons: 36,
    },
  });

  const courseDataScience = await prisma.course.create({
    data: {
      name: 'Python & Data Science (AI Asoslari)',
      description: 'Python asoslari, NumPy, Pandas, ma\'lumotlar tahlili, vizualizatsiya va Machine Learning modellarini ishlab chiqish.',
      price: 900000,
      durationMonths: 4,
      lessonsPerMonth: 12,
      totalLessons: 48,
    },
  });

  const courseDesign = await prisma.course.create({
    data: {
      name: 'UI/UX Dizayn va Figma Masterclass',
      description: 'Foydalanuvchi tajribasi (UX research), Wireframing, zamonaviy UI interfeyslar, Dizayn tizimlari va interaktiv prototiplash.',
      price: 700000,
      durationMonths: 3,
      lessonsPerMonth: 12,
      totalLessons: 36,
    },
  });

  // Frontend dars mavzulari (Sentyabr va Oktyabr oylari uchun 26 ta dars)
  const feTopics = [
    { topic: 'HTML5 Semantic & Zamonaviy CSS Flexbox/Grid', desc: 'Zamonaviy adaptiv maketlar, CSS custom properties va responsive dizayn tamoyillari.' },
    { topic: 'TypeScript Asoslari & Static Typing', desc: 'Tiplar, interfeyslar, Union/Intersection tiplar va Clean Code tamoyillari.' },
    { topic: 'Git & GitHub Jamoaviy Ishlash Madaniyati', desc: 'Branching, Pull Requests, Merge Conflicts va Git rebase bilan ishlash.' },
    { topic: 'Vue 3 ga Kirish & Vite Ekotizimi', desc: 'Vite loyiha strukturasi, Single File Components (SFC) va virtual DOM ishlashi.' },
    { topic: 'Reaktivlik Yadrosi: ref, reactive va toRefs', desc: 'Vue 3 Composition API reaktivlik mexanizmi, Proxy ob\'ektlar.' },
    { topic: 'Computed Properties va Watch/WatchEffect', desc: 'Hisoblanadigan qiymatlar, chuqur kuzatuv (deep watch) va kechiktirilgan effektlar.' },
    { topic: 'Komponentlar Aloqasi: Props, Emits & defineModel', desc: 'Bir yo\'nalishli ma\'lumot oqimi, custom hodisalar va ikki tomonlama bog\'lanish.' },
    { topic: 'Slots, Scoped Slots va Dinamik Komponentlar', desc: 'Qayta ishlatiluvchi komponentlar shabloni, slot orqali ma\'lumot uzatish.' },
    { topic: 'Lifecycle Hooks & Amaliy DOM Manipulyatsiyasi', desc: 'onMounted, onBeforeUnmount, template refs va resurslarni tozalash.' },
    { topic: 'Custom Composables: Logikani Qayta Ishlatish', desc: 'Modulli arxitektura, reusable state va funksional kompozitsiya.' },
    { topic: 'Vue Router 4: Marshrutlash & Navigation Guards', desc: 'Dinamik parametrlar, nested routes, meta fields va RBAC himoya tizimi.' },
    { topic: 'Pinia State Management: Global Holat Boshqaruvi', desc: 'Store, getters, synchronous/asynchronous actions va holat sinxronizatsiyasi.' },
    { topic: 'Axios Integratsiyasi & Interceptorlar Bilan Ishlash', desc: 'JWT Access/Refresh tokenlarni avtomatik yangilash va global xatolarni tutish.' },
    { topic: 'Tailwind CSS & Headless UI Bilan Professional Dizayn', desc: 'Komponentlar kutubxonasi, Dark mode va animatsiyalar yaratish.' },
    { topic: 'Formalar va Validatsiya: Vee-Validate & Zod', desc: 'Murakkab formalar, real-time validatsiya va xatoliklar xabari.' },
    { topic: 'Katta Hajmdagi Ma\'lumotlar & Virtual Scrolling', desc: 'Performansni oshirish, dom node-lar sonini kamaytirish va infinite scroll.' },
    { topic: 'Real-time Aloqa: WebSockets & Server-Sent Events', desc: 'Jonli bildirishnomalar, chat va davomat holatlarini real vaqtda yangilash.' },
    { topic: 'Oraliq Nazorat Imtihoni: Mini SPA Loyiha Himoyasi', desc: 'Talabalar mustaqil bajargan amaliy dasturiy loyihalarini taqdimot qiladi.' },
    { topic: 'Vue 3 Performance: Lazy Loading & Code Splitting', desc: 'Bundle hajmini qisqartirish, route darajasidagi chunklar va memoization.' },
    { topic: 'Progressive Web Apps (PWA) & Offline Rejim', desc: 'Service Workers, manifest.json va oflayn kesh strategiyalari.' },
    { topic: 'Unit Testlash Asoslari: Vitest & Vue Test Utils', desc: 'Komponentlarni testlash, mocks, stubs va coverage tahlili.' },
    { topic: 'End-to-End Testlash: Playwright Bilan UI Testlar', desc: 'Foydalanuvchi ssenariylarini brauzerda avtomatlashtirilgan tekshirish.' },
    { topic: 'CI/CD Pipeline: GitHub Actions Avtomatizatsiyasi', desc: 'Build, lint va testlarni avtomatik ishga tushirish, xatolarni oldini olish.' },
    { topic: 'Cloud Deploy: Docker & Vercel/Netlify Ga Joylash', desc: 'Dockerfile, Nginx konfiguratsiyasi va production optimizatsiyasi.' },
    { topic: 'Diplom Loyihasi: Arxitektura va Modullar Taqsimoti', desc: 'Katta CRM/ERP tizimi arxitekturasi bo\'yicha topshiriqlarni belgilash.' },
    { topic: 'Loyiha Pre-Defense & Texnik Intervyuga Tayyorgarlik', desc: 'Junior/Middle Frontend pozitsiyalari uchun texnik savol-javoblar va portfolio.' },
  ];

  for (let i = 0; i < feTopics.length; i++) {
    await prisma.courseSyllabus.create({
      data: {
        courseId: courseFrontend.id,
        lessonOrder: i + 1,
        topic: feTopics[i].topic,
        description: feTopics[i].desc,
      },
    });
  }

  // Backend dars mavzulari
  const beTopics = [
    { topic: 'Node.js Internals, V8 Engine & TypeScript Sozlamalari', desc: 'Event Loop, Call Stack, Microtasks va qat\'iy tsconfig sozlamalari.' },
    { topic: 'NestJS Arxitekturasi: Modullar, Controllerlar & Servislar', desc: 'Dependency Injection (DI), Inversion of Control (IoC) va loyiha tuzilishi.' },
    { topic: 'RESTful API Standartlari & DTO Validatsiyasi', desc: 'class-validator, class-transformer va kiruvchi parametrlarni sanitizatsiya qilish.' },
    { topic: 'PostgreSQL Relyatsion Ma\'lumotlar Bazasi Asoslari', desc: 'Jadvallar, indekslar, xorijiy kalitlar va relyatsion relyatsiyalar.' },
    { topic: 'Prisma ORM: Sxema Arxitekturasi & Migratsiyalar', desc: 'Prisma schema, 1:1, 1:N, N:M relatsiyalari va migratsiya boshqaruvi.' },
    { topic: 'Prisma Client: Murakkab So\'rovlar, Filtering & Pagination', desc: 'findMany, include, select, aggegatsiya va cursor/offset pagination.' },
    { topic: 'Autentifikatsiya: Parollar Heshlash (bcrypt) & JWT Token', desc: 'Passport.js, JWT Access token va Refresh tokenni cookie orqali uzatish.' },
    { topic: 'Avtorizatsiya: Role-Based Access Control (RBAC) Guards', desc: 'Custom Decorators, SetMetadata va rollarni tekshiruvchi Guardlar.' },
    { topic: 'Fayllarni Xavfsiz Yuklash: Multer & MinIO/S3 Saqlash', desc: 'Fayl hajmini cheklash, mime-type tekshirish va serverda saqlash.' },
    { topic: 'Global Exception Filters & Tizim Xatoliklarini Boshqarish', desc: 'Unifikatsiyalangan xatolik javoblari va ishlab chiqarishdagi loglar.' },
    { topic: 'NestJS Interceptors & Javoblarni Standartlashtirish', desc: '{ success: true, data: ... } transformatsiyasi va execution time loger.' },
    { topic: 'Redis Caching: Yuqori Tezlikdagi Kesh Tizimi', desc: 'Kesh yozish, muddati (TTL), Invalidation strategiyalari va keshlash.' },
    { topic: 'Asinxron Navbatlar: BullMQ & Redis Workerlar', desc: 'Og\'ir vazifalarni fonga olish, email/SMS yuborish va retry logikasi.' },
    { topic: 'SMS & Email Bildirishnomalar Integratsiyasi', desc: 'Eskiz SMS provayderi va Nodemailer orqali tranzaksion bildirishnomalar.' },
    { topic: 'NestJS WebSockets: Gateways & Real-Time Ekotizim', desc: 'Socket.io, xonalarga obuna bo\'lish va real vaqtda hodisalar tarqatish.' },
    { topic: 'ACID Tranzaksiyalari & Ma\'lumotlar Butunligi', desc: 'Prisma $transaction, balans o\'zgarishlari va moliyaviy tranzaksiyalar xavfsizligi.' },
    { topic: 'Oraliq Nazorat Imtihoni: Enterprise E-commerce Backend', desc: 'Haqiqiy loyiha himoyasi va SQL so\'rovlar samaradorligi tekshiruvi.' },
    { topic: 'To\'lov Tizimlari: Payme, Click & Uzum Integratsiyasi', desc: 'To\'lov protokollari, CheckPerformTransaction, PerformTransaction va chek tasdig\'i.' },
    { topic: 'Swagger (OpenAPI 3.0) Bilan Avtomatik Hujjatlashtirish', desc: 'ApiTags, ApiOperation, ApiBearerAuth va interactive API sinov muhiti.' },
    { topic: 'Xavfsizlik: Rate Limiting, Helmet, CSRF & CORS', desc: 'DDoS hujumlaridan himoya, NestJS Throttler moduli va HTTP headerlar.' },
    { topic: 'Avtomatlashtirilgan Testlash: Unit & E2E (Jest & Supertest)', desc: 'Servis unit testlari, test ma\'lumotlar bazasi va kontroller e2e testlari.' },
    { topic: 'Docker Containerization: Ko\'p Bosqichli (Multi-stage) Build', desc: 'Dockerfile yozish, node_modules optimizatsiyasi va Docker Compose muhiti.' },
    { topic: 'Mikroservislar Asoslari: RabbitMQ Bilan Xabar Almashish', desc: 'Message Brokerlar, Event-driven arxitektura va RPC so\'rovlar.' },
    { topic: 'Monitoring: Prometheus Metrikalari & Grafana Dashboard', desc: 'CPU, xotira sarfi, API kechikish vaqtlari (latency) monitoringi.' },
    { topic: 'Production VPS Ga Joylash (CI/CD, PM2 & Nginx Reverse Proxy)', desc: 'Ubuntu serverni sozlash, SSL sertifikatlar (Certbot) va avtomatik restart.' },
    { topic: 'Backend Diplom Himoyasi & Texnik Arxitektura Tahlili', desc: 'Katta hajmli taqsimlangan tizim dizayni va intervyu masalalari.' },
  ];

  for (let i = 0; i < beTopics.length; i++) {
    await prisma.courseSyllabus.create({
      data: {
        courseId: courseBackend.id,
        lessonOrder: i + 1,
        topic: beTopics[i].topic,
        description: beTopics[i].desc,
      },
    });
  }

  // English dars mavzulari
  const ieltsTopics = [
    { topic: 'IELTS Diagnostic Test & Band 7.5+ Strategy Roadmap', desc: 'Format tahlili, boshlang\'ich darajani aniqlash va individual rivojlanish rejasi.' },
    { topic: 'Listening Section 1 & 2: Form Completion & Map Labeling', desc: 'Spelling, audio signposts va raqamlar bilan ishlash strategiyalari.' },
    { topic: 'Reading Passage 1: Skimming, Scanning & True/False/Not Given', desc: 'Paraphrasing tamoyillari, kalit so\'zlarni topish va vaqt taqsimoti.' },
    { topic: 'Writing Task 1: Line Graphs & Bar Charts Data Overview', desc: 'Struktura, umumiy xulosalar (overview) va o\'zgarish dinamikasini tasvirlash.' },
    { topic: 'Speaking Part 1: Fluency, Coherence & Natural Responses', desc: 'Oddiy savollarga tabiiy javob berish, kengaytirilgan iboralar va ritm.' },
    { topic: 'Listening Section 3 & 4: Multiple Choice & Academic Lectures', desc: 'Murakkab chalg\'ituvchi (distractor) variantlarni aniqlash va qisqa xulosalar.' },
    { topic: 'Reading Passage 2: Matching Headings & Information', desc: 'Abzatsning asosiy g\'oyasini ajratish va sarlavhalarni xatosiz joylashtirish.' },
    { topic: 'Writing Task 2: Opinion (Agree/Disagree) Essay Structure', desc: 'Kirish qismi, aniq pozitsiya, argumentlar va xulosalarni shakllantirish.' },
    { topic: 'Speaking Part 2: 2-Minute Monologue Cue Card Mastery', desc: '1 daqiqalik tayyorgarlik rejasi, fikrlar ketma-ketligi va boy leksika.' },
    { topic: 'Writing Task 1: Pie Charts, Tables & Process Diagrams', desc: 'Jarayonlar diagrammasi, passiv grammatika va taqqoslash iboralari.' },
    { topic: 'Reading Passage 3: Sentence Completion & Summary Completion', desc: 'Akademik matnlarni tahlil qilish, sinonimlar va kontekstual tushunish.' },
    { topic: 'Writing Task 2: Discussion (Discuss Both Views) Essays', desc: 'Ikkala tomon qarashlarini xolis tahlil qilish va muvozanatli xulosa.' },
    { topic: 'Speaking Part 3: Abstract Ideas & Deep Analytical Answers', desc: 'Falsafiy va ijtimoiy savollarga 4 bosqichli professional javob berish.' },
    { topic: 'Midterm Full Mock Examination (All 4 Modules)', desc: 'Real imtihon sharoitida to\'liq mock test va individual tahlil.' },
    { topic: 'Individual Mock Feedback & Error Correction Workshop', desc: 'Har bir talabaning zaif nuqtalari ustida ishlash va balni oshirish choralari.' },
    { topic: 'Writing Task 2: Problem-Solution & Advantage-Disadvantage Essays', desc: 'Sabab-oqibat zanjiri va taklif qilinadigan yechimlarni yoritish.' },
    { topic: 'Reading Speed Boost: 15 Daqiqada 1 ta Passage Yechish', desc: 'Tez o\'qish ko\'nikmalari va murakkab ilmiy atamalarga chalg\'imaslik.' },
    { topic: 'Listening Audio Accents: British, Australian & North American', desc: 'Turli urg\'ularni ajratish va chalg\'ituvchi so\'zlarga aldanmaslik.' },
    { topic: 'Grammar for 7.5+: Complex Sentences, Inversion & Conditionals', desc: 'Murakkab grammatik konstruksiyalar va stilistik xatolarni yo\'qotish.' },
    { topic: 'Lexical Resource: Less Common & Idiomatic Vocabulary', desc: 'Topic-specific akademik iboralar va kollokatsiyalarni o\'rganish.' },
    { topic: 'Writing Task 1 Map Comparison: Past vs Present/Future', desc: 'Xaritalar o\'zgarishi, fazoviy predloglar va relyativ qurilmalar.' },
    { topic: 'Speaking Pronunciation & Intonation Fine-Tuning', desc: 'Urg\'u, intonatsiya, so\'zlarni ulab aytish (linking sounds).' },
    { topic: 'Writing Cohesion & Coherence: Advanced Discourse Markers', desc: 'Bog\'lovchi so\'zlarni ortiqcha ishlatmasdan matn ravonligini ta\'minlash.' },
    { topic: 'Final Full-Length Simulation Test (Strict Exam Rules)', desc: 'Rasmiy IELTS imtihoniga to\'liq tayyorgarlik sinovi.' },
    { topic: 'Score Prediction & Psychological Preparation for Test Day', desc: 'Imtihon kuni hayajonni yengish va vaqtni boshqarish bo\'yicha maslahatlar.' },
    { topic: 'Graduation Ceremony & Official Mock Certificates', desc: 'Kursni tamomlash, eng yuqori natija ko\'rsatganlarni taqdirlash.' },
  ];

  for (let i = 0; i < ieltsTopics.length; i++) {
    await prisma.courseSyllabus.create({
      data: {
        courseId: courseEnglish.id,
        lessonOrder: i + 1,
        topic: ieltsTopics[i].topic,
        description: ieltsTopics[i].desc,
      },
    });
  }

  // ==========================================
  // 4. GURUHLAR (GROUPS) - Sentyabr 2026 da boshlangan
  // ==========================================
  console.log('👥 Guruhlar yaratilmoqda...');

  // FE-201: Dushanba, Chorshanba, Juma (14:00 - 16:00)
  const group1 = await prisma.group.create({
    data: {
      name: 'FE-201 (Vue 3 Pro)',
      startDate: new Date('2026-09-02'),
      endDate: new Date('2026-12-30'),
      startTime: '14:00',
      endTime: '16:00',
      maxStudents: 15,
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
      status: 'ACTIVE',
      courseId: courseFrontend.id,
      roomId: room1.id,
    },
  });

  // BE-105: Seshanba, Payshanba, Shanba (16:30 - 18:30)
  const group2 = await prisma.group.create({
    data: {
      name: 'BE-105 (NestJS Enterprise)',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2027-01-30'),
      startTime: '16:30',
      endTime: '18:30',
      maxStudents: 14,
      weekDays: ['TUESDAY', 'THURSDAY', 'SATURDAY'],
      status: 'ACTIVE',
      courseId: courseBackend.id,
      roomId: room2.id,
    },
  });

  // IELTS-Master 7.5: Dushanba, Chorshanba, Juma (10:00 - 12:00)
  const group3 = await prisma.group.create({
    data: {
      name: 'IELTS-Master 7.5',
      startDate: new Date('2026-09-02'),
      endDate: new Date('2026-11-28'),
      startTime: '10:00',
      endTime: '12:00',
      maxStudents: 18,
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
      status: 'ACTIVE',
      courseId: courseEnglish.id,
      roomId: room3.id,
    },
  });

  // DS-101: Seshanba, Payshanba, Shanba (14:00 - 16:00)
  const group4 = await prisma.group.create({
    data: {
      name: 'DS-101 (Python & AI)',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-12-31'),
      startTime: '14:00',
      endTime: '16:00',
      maxStudents: 16,
      weekDays: ['TUESDAY', 'THURSDAY', 'SATURDAY'],
      status: 'ACTIVE',
      courseId: courseDataScience.id,
      roomId: room4.id,
    },
  });

  // UI-102: Dushanba, Chorshanba, Juma (16:30 - 18:30)
  const group5 = await prisma.group.create({
    data: {
      name: 'UI-102 (Figma UI/UX Pro)',
      startDate: new Date('2026-09-02'),
      endDate: new Date('2026-11-30'),
      startTime: '16:30',
      endTime: '18:30',
      maxStudents: 15,
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
      status: 'ACTIVE',
      courseId: courseDesign.id,
      roomId: room5.id,
    },
  });

  // O'qituvchilarni guruhlarga biriktirish
  await prisma.groupTeacher.createMany({
    data: [
      { groupId: group1.id, teacherId: teacherFrontend.id, isMain: true },
      { groupId: group2.id, teacherId: teacherBackend.id, isMain: true },
      { groupId: group2.id, teacherId: teacherFrontend.id, isMain: false }, // Assistenti
      { groupId: group3.id, teacherId: teacherEnglish.id, isMain: true },
      { groupId: group4.id, teacherId: teacherDataScience.id, isMain: true },
      { groupId: group5.id, teacherId: teacherDesign.id, isMain: true },
    ],
  });

  // Talabalarni guruhlarga taqsimlash
  // group1 (FE): Jasur, Madina, Bobur, Sardor, Shahlo, Javohir
  const g1Students = [students[0], students[1], students[2], students[3], students[4], students[5]];
  for (const st of g1Students) {
    await prisma.groupStudent.create({ data: { groupId: group1.id, studentId: st.id } });
  }

  // group2 (BE): Jasur, Kamron, Farrux, Ulug'bek, Bobur, Nilufar
  const g2Students = [students[0], students[6], students[8], students[10], students[2], students[9]];
  for (const st of g2Students) {
    await prisma.groupStudent.create({ data: { groupId: group2.id, studentId: st.id } });
  }

  // group3 (IELTS): Madina, Shahlo, Aziza, Nilufar, Mohira, Sardor
  const g3Students = [students[1], students[4], students[7], students[9], students[11], students[3]];
  for (const st of g3Students) {
    await prisma.groupStudent.create({ data: { groupId: group3.id, studentId: st.id } });
  }

  // group4 (DS): Javohir, Kamron, Farrux, Mohira, Ulug'bek
  const g4Students = [students[5], students[6], students[8], students[11], students[10]];
  for (const st of g4Students) {
    await prisma.groupStudent.create({ data: { groupId: group4.id, studentId: st.id } });
  }

  // group5 (UI): Sardor, Shahlo, Aziza, Nilufar, Madina
  const g5Students = [students[3], students[4], students[7], students[9], students[1]];
  for (const st of g5Students) {
    await prisma.groupStudent.create({ data: { groupId: group5.id, studentId: st.id } });
  }

  console.log('✅ Guruhlar va ularning o\'qituvchilari hamda talabalari muvaffaqiyatli biriktirildi');

  // =========================================================================
  // 5. DARSLAR (LESSONS) - SENTYABR VA OKTYABR 2026 UCHUN TO'LIQ REJALASHTIRILGAN
  // =========================================================================
  console.log('📅 Sentyabr va Oktyabr 2026 darslari yaratilmoqda...');

  const startDateSep = new Date('2026-09-01');
  const endDateOct = new Date('2026-10-31');
  const today = new Date('2026-09-22'); // Joriy sana

  // Har bir guruh konfiguratsiyasi
  const groupConfigs = [
    {
      group: group1,
      teacher: teacherFrontend,
      room: room1,
      students: g1Students,
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'] as WeekDay[],
      topics: feTopics,
    },
    {
      group: group2,
      teacher: teacherBackend,
      room: room2,
      students: g2Students,
      weekDays: ['TUESDAY', 'THURSDAY', 'SATURDAY'] as WeekDay[],
      topics: beTopics,
    },
    {
      group: group3,
      teacher: teacherEnglish,
      room: room3,
      students: g3Students,
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'] as WeekDay[],
      topics: ieltsTopics,
    },
    {
      group: group4,
      teacher: teacherDataScience,
      room: room4,
      students: g4Students,
      weekDays: ['TUESDAY', 'THURSDAY', 'SATURDAY'] as WeekDay[],
      topics: beTopics.map((b, idx) => ({ topic: `Python AI #${idx + 1}: ${b.topic.split(':')[1] || b.topic}`, desc: b.desc })),
    },
    {
      group: group5,
      teacher: teacherDesign,
      room: room5,
      students: g5Students,
      weekDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'] as WeekDay[],
      topics: feTopics.map((f, idx) => ({ topic: `UI/UX Design #${idx + 1}: ${f.topic.split(':')[1] || f.topic}`, desc: f.desc })),
    },
  ];

  let totalLessonsCreated = 0;
  let totalAttendancesCreated = 0;
  let totalHomeworksCreated = 0;

  for (const cfg of groupConfigs) {
    const dates = calculateLessonDates(startDateSep, endDateOct, cfg.weekDays);

    for (let i = 0; i < dates.length; i++) {
      const lessonDate = dates[i];
      const lessonOrder = i + 1;
      const topicInfo = cfg.topics[i] || {
        topic: `Dars #${lessonOrder}: Kengaytirilgan amaliy mashg'ulot`,
        desc: 'Amaliy laboratoriya ishlari, kod tahlili va savol-javoblar.',
      };

      const lesson = await prisma.lesson.create({
        data: {
          lessonOrder,
          topic: topicInfo.topic,
          description: topicInfo.desc,
          lessonDate,
          startTime: cfg.group.startTime,
          endTime: cfg.group.endTime,
          groupId: cfg.group.id,
          teacherId: cfg.teacher.id,
          roomId: cfg.room.id,
          status: 'ACTIVE',
        },
      });
      totalLessonsCreated++;

      // Dars materiallari
      if (lessonOrder <= 4) {
        await prisma.lessonMaterial.create({
          data: {
            title: `${topicInfo.topic} — Taqdimot va Konspekt`,
            fileUrl: `https://storage.nyver.uz/materials/${cfg.group.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_lesson_${lessonOrder}.pdf`,
            fileType: 'pdf',
            sizeMb: 4.8,
            lessonId: lesson.id,
          },
        });
      }

      // Agar dars sanasi bugungi kundan oldin yoki bugun bo'lsa (<= 2026-09-22):
      // Haqiqiy davomat va uy vazifalari yoziladi
      const isPastOrToday = lessonDate <= today;
      if (isPastOrToday) {
        // Davomat
        for (let sIdx = 0; sIdx < cfg.students.length; sIdx++) {
          const student = cfg.students[sIdx];

          // Realistik davomat holati
          let status: AttendanceStatus = 'PRESENT';
          let coins = 2;
          let note: string | null = 'Darsda faol ishtirok etdi';

          // Ba'zi talabalar uchun har xil real holatlar
          const hashVal = (lesson.id * 7 + student.id * 13) % 10;
          if (hashVal === 0) {
            status = 'LATE';
            coins = 1;
            note = '12 daqiqa kechikib keldi';
          } else if (hashVal === 1 && lessonOrder > 2) {
            status = 'ABSENT';
            coins = 0;
            note = 'Sababsiz darsga qatnashmadi';
          } else if (hashVal === 2 && lessonOrder === 5) {
            status = 'EXCUSED';
            coins = 0;
            note = 'Sog\'lig\'i sababli ogohlantirgan holda qatnashmadi';
          }

          await prisma.attendance.create({
            data: {
              status,
              coinsEarned: coins,
              note,
              studentId: student.id,
              lessonId: lesson.id,
              markedById: cfg.teacher.id,
            },
          });
          totalAttendancesCreated++;
        }

        // Uy vazifasi (Har 1-2 darsda albatta uy vazifasi berilgan)
        if (lessonOrder % 2 === 1 || lessonOrder === 2 || lessonOrder === 4) {
          const deadline = new Date(lessonDate.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 kundan keyin
          deadline.setHours(23, 59, 59, 0);

          const hw = await prisma.homework.create({
            data: {
              title: `${topicInfo.topic} bo'yicha amaliy vazifa`,
              task: `Ushbu darsda o'tilgan ${topicInfo.topic} mavzusini to'liq mustahkamlash uchun berilgan texnik talablarni bajaring. Loyihani GitHub repozitoriyga joylang va deploy qilingan havolasini yuboring.`,
              maxScore: 100,
              maxCoins: 10,
              deadline,
              lessonId: lesson.id,
            },
          });
          totalHomeworksCreated++;

          // Talabalar topshirgan yechimlari
          for (let sIdx = 0; sIdx < cfg.students.length; sIdx++) {
            const student = cfg.students[sIdx];
            const isCompleted = lessonDate < today; // O'tgan darslar tekshirilgan

            if (isCompleted) {
              const score = 85 + ((student.id * 5 + lesson.id) % 16); // 85..100 ball
              const coinsEarned = score >= 90 ? 10 : 5;

              await prisma.homeworkSubmission.create({
                data: {
                  textAnswer: `Vazifani muvaffaqiyatli topshirdim. GitHub repozitoriy: https://github.com/${student.firstName.toLowerCase()}/nyver-hw-${lessonOrder}. Jonli demo: https://${student.firstName.toLowerCase()}-task.vercel.app`,
                  status: 'ACCEPTED',
                  score,
                  coinsEarned,
                  feedback: score >= 95 ? 'Mukammal yechim! Kod toza va barcha mezonlar qondirilgan.' : 'Yaxshi natija, keyingi safar arxitekturaga e\'tibor bering.',
                  homeworkId: hw.id,
                  studentId: student.id,
                  checkedById: cfg.teacher.id,
                  submittedAt: new Date(lessonDate.getTime() + 1 * 24 * 60 * 60 * 1000),
                  checkedAt: new Date(lessonDate.getTime() + 2 * 24 * 60 * 60 * 1000),
                },
              });
            } else if (formatDate(lessonDate) === formatDate(today)) {
              // Bugungi dars vazifasi topshirilgan, lekin tekshirilishi kutilmoqda (PENDING)
              if (sIdx < 3) {
                await prisma.homeworkSubmission.create({
                  data: {
                    textAnswer: `Bugungi topshiriq tayyor: https://github.com/${student.firstName.toLowerCase()}/task-sep22`,
                    status: 'PENDING',
                    coinsEarned: 0,
                    homeworkId: hw.id,
                    studentId: student.id,
                    submittedAt: new Date(),
                  },
                });
              }
            }
          }
        }
      }
    }
  }

  console.log(`✅ Jami ${totalLessonsCreated} ta dars sentyabr va oktyabr oylariga to'liq taqsimlandi`);
  console.log(`✅ Jami ${totalAttendancesCreated} ta real davomat yozildi`);
  console.log(`✅ Jami ${totalHomeworksCreated} ta uy vazifalari va topshiriqlari biriktirildi`);

  // ==========================================
  // 6. ORALIQ NAZORAT IMTIHONLARI (EXAMS & EXAM RESULTS)
  // ==========================================
  console.log('📝 Sentyabr oyi oraliq imtihonlari yaratilmoqda...');

  const exam1 = await prisma.exam.create({
    data: {
      title: '1-Modul Oraliq Nazorat: Vue 3 Asoslari va Reaktivlik',
      examDate: new Date('2026-09-18T14:00:00Z'),
      maxScore: 100,
      groupId: group1.id,
    },
  });

  for (const st of g1Students) {
    const score = 78 + ((st.id * 7) % 23); // 78 .. 100
    await prisma.examResult.create({
      data: {
        examId: exam1.id,
        studentId: st.id,
        score,
      },
    });
  }

  const exam2 = await prisma.exam.create({
    data: {
      title: 'Backend 1-Modul: REST API & Prisma Architecture Imtihoni',
      examDate: new Date('2026-09-19T16:30:00Z'),
      maxScore: 100,
      groupId: group2.id,
    },
  });

  for (const st of g2Students) {
    const score = 82 + ((st.id * 4) % 19);
    await prisma.examResult.create({
      data: {
        examId: exam2.id,
        studentId: st.id,
        score,
      },
    });
  }

  const exam3 = await prisma.exam.create({
    data: {
      title: 'IELTS Midterm Mock: Reading & Listening Diagnostic',
      examDate: new Date('2026-09-18T10:00:00Z'),
      maxScore: 100,
      groupId: group3.id,
    },
  });

  for (const st of g3Students) {
    const score = 75 + ((st.id * 6) % 25);
    await prisma.examResult.create({
      data: {
        examId: exam3.id,
        studentId: st.id,
        score,
      },
    });
  }

  console.log('✅ Imtihonlar va o\'quvchilar natijalari saqlandi');

  // ==========================================
  // 7. TO'LOVLAR (PAYMENTS) - Sentyabr va Oktyabr oylari
  // ==========================================
  console.log('💳 Haqiqiy to\'lovlar yaratilmoqda...');

  const paymentsData: any[] = [];
  const paymentMethods: PaymentType[] = ['PAYME', 'CLICK', 'UZUM', 'CARD', 'CASH', 'BANK_TRANSFER'];

  for (let i = 0; i < students.length; i++) {
    const st = students[i];
    const pType = paymentMethods[i % paymentMethods.length];

    // Sentyabr oyi to'lovi (barcha faol talabalar sentyabrda to'lagan)
    const sepDay = 2 + (i % 12);
    paymentsData.push({
      amount: 850000,
      type: pType,
      status: 'PAID' as PaymentStatus,
      paidForDate: new Date(`2026-09-${sepDay < 10 ? '0' + sepDay : sepDay}T11:00:00Z`),
      comment: `Sentyabr oyi o'quv to'lovi (${pType} orqali to'landi)`,
      studentId: st.id,
    });

    // Oktyabr oyi uchun oldindan to'lov qilganlar yoki to'lovni kutayotganlar
    if (i % 3 === 0) {
      paymentsData.push({
        amount: 850000,
        type: pType,
        status: 'PAID' as PaymentStatus,
        paidForDate: new Date('2026-09-20T15:30:00Z'),
        comment: `Oktyabr oyi uchun oldindan to'lov (${pType})`,
        studentId: st.id,
      });
    } else if (i % 3 === 1) {
      paymentsData.push({
        amount: 850000,
        type: 'CASH' as PaymentStatus,
        status: 'PENDING' as PaymentStatus,
        paidForDate: new Date('2026-10-01T09:00:00Z'),
        comment: 'Oktyabr oyi to\'lovi kutilmoqda (rejalashtirilgan)',
        studentId: st.id,
      });
    }
  }

  await prisma.payment.createMany({ data: paymentsData });
  console.log(`✅ ${paymentsData.length} ta haqiqiy to'lov yozuvi kiritildi`);

  // ==========================================
  // 8. SOVRINLAR VA COIN TRANZAKSIYALARI
  // ==========================================
  console.log('🎁 Do\'kon sovrinlari va tanga tranzaksiyalari yaratilmoqda...');

  const prize1 = await prisma.prize.create({
    data: {
      name: 'Nyver Premium Dasturchilar Hudisi (Black Edition)',
      description: '100% paxta, qalin va qulay zamonaviy brendli hudi.',
      priceCoins: 120,
      stockCount: 15,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60',
    },
  });

  const prize2 = await prisma.prize.create({
    data: {
      name: 'Logitech M330 Silent Simsiz Sichqoncha',
      description: 'Shovqinsiz tugmalar, yuqori sezuvchanlik va batareya muddati 24 oy.',
      priceCoins: 200,
      stockCount: 8,
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    },
  });

  const prize3 = await prisma.prize.create({
    data: {
      name: 'Metall Smart Termos (500ml, Harorat Ko\'rsatkichi Bilan)',
      description: 'Haroratni 24 soat saqlaydi, LED sensorli ekran.',
      priceCoins: 80,
      stockCount: 20,
      imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=60',
    },
  });

  const prize4 = await prisma.prize.create({
    data: {
      name: 'Developer Vinyl Stikerlar To\'plami (60 dona)',
      description: 'Vue, NestJS, TypeScript, Docker, Linux yuqori sifatli suv o\'tmas stikerlar.',
      priceCoins: 30,
      stockCount: 50,
      imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=500&auto=format&fit=crop&q=60',
    },
  });

  const prize5 = await prisma.prize.create({
    data: {
      name: 'Redragon Mexanik Klaviatura (RGB, Blue Switch)',
      description: 'Dasturchilar va geymerlar uchun professional mexanik klaviatura.',
      priceCoins: 350,
      stockCount: 4,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
    },
  });

  // Tanga tranzaksiyalari va xaridlar
  for (const st of students.slice(0, 6)) {
    await prisma.coinTransaction.createMany({
      data: [
        {
          amount: 20,
          reason: 'ATTENDANCE',
          description: 'Sentyabr oyi darslariga muntazam qatnashgani uchun',
          userId: st.id,
        },
        {
          amount: 50,
          reason: 'HOMEWORK_EXCELLENT',
          description: 'Topshiriqlarni a\'lo va muddatidan oldin bajargani uchun',
          userId: st.id,
        },
        {
          amount: 30,
          reason: 'EXAM_TOP',
          description: 'Oraliq nazorat imtihonida yuqori natija ko\'rsatgani uchun',
          userId: st.id,
        },
      ],
    });
  }

  // Sovrin buyurtmalari
  await prisma.prizeOrder.create({
    data: {
      studentId: students[0].id,
      prizeId: prize4.id,
      coinsSpent: 30,
      isGiven: true,
    },
  });

  await prisma.prizeOrder.create({
    data: {
      studentId: students[4].id,
      prizeId: prize3.id,
      coinsSpent: 80,
      isGiven: false, // Berilishi kutilmoqda
    },
  });

  await prisma.coinTransaction.create({
    data: {
      amount: -30,
      reason: 'PRIZE_PURCHASE',
      description: 'Developer Vinyl Stikerlar To\'plami xarid qilindi',
      userId: students[0].id,
    },
  });

  await prisma.coinTransaction.create({
    data: {
      amount: -80,
      reason: 'PRIZE_PURCHASE',
      description: 'Metall Smart Termos xarid qilindi',
      userId: students[4].id,
    },
  });

  console.log('✅ Sovrinlar va xarid buyurtmalari yaratildi');

  console.log('\n========================================================');
  console.log('🎉 BARCHA REAL MA\'LUMOTLAR MUVAFFAQIYATLI SAQLANDI!');
  console.log('========================================================');
  console.log('📅 Darslar davri: Sentyabr 2026 va Oktyabr 2026');
  console.log('🏢 Guruhlar: FE-201, BE-105, IELTS-Master 7.5, DS-101, UI-102');
  console.log('🎓 Talabalar: 12 ta real to\'liq profillar');
  console.log('👨‍🏫 O\'qituvchilar: 5 ta ixtisoslashgan ustozlar');
  console.log('🔑 Tizimga kirish ma\'lumotlari:');
  console.log('   SUPERADMIN: one.humoyun@gmail.com / Kuchli@Parol99 (yoki +998900000001 / Kuchli@Parol99)');
  console.log('   ADMIN:      admin@nyver.uz / 123456 (yoki +998901234567 / 123456)');
  console.log('   TEACHER:    teacher@nyver.uz / 123456 (Rustam Qodirov, +998931112233 / 123456)');
  console.log('   STUDENT:    student@nyver.uz / 123456 (Jasur Bekmirzayev, +998971239988 / 123456)');
  console.log('========================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed xatosi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
