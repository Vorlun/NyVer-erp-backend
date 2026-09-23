var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
let MailService = MailService_1 = class MailService {
    configService;
    logger = new Logger(MailService_1.name);
    transporter = null;
    mailFrom;
    constructor(configService) {
        this.configService = configService;
        const host = this.configService.get('MAIL_HOST');
        const port = Number(this.configService.get('MAIL_PORT') || 587);
        const secure = port === 465 || this.configService.get('MAIL_SECURE') === 'true';
        const user = this.configService.get('MAIL_USER');
        const pass = this.configService.get('MAIL_PASS');
        const envFrom = this.configService.get('MAIL_FROM');
        if (user && host?.includes('gmail.com')) {
            this.mailFrom = `"NyVer O'quv Markazi" <${user}>`;
        }
        else {
            this.mailFrom =
                envFrom ||
                    (user ? `"NyVer O'quv Markazi" <${user}>` : `"NyVer O'quv Markazi" <noreply@nyver.uz>`);
        }
        if (host && user && pass) {
            try {
                this.transporter = nodemailer.createTransport({
                    host,
                    port,
                    secure,
                    auth: { user, pass },
                });
                this.logger.log(`SMTP Mailer initialized successfully with host: ${host} (From: ${this.mailFrom})`);
            }
            catch (err) {
                this.logger.warn(`Failed to initialize SMTP transporter: ${err.message}`);
            }
        }
        else {
            this.logger.warn(`SMTP ma'lumotlari to'liq kiritilmagan (MAIL_HOST, MAIL_USER, MAIL_PASS). Xatlar server konsoliga Preview rejimida chiqariladi.`);
        }
    }
    async sendWelcomeCredentialsEmail(options) {
        const { to, studentName, login, password, courseName, amount } = options;
        const formattedAmount = Number(amount).toLocaleString('uz-UZ');
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NyVer — Shaxsiy Kabinetingiz Rezkvizitlari</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); padding: 36px 32px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 32px; }
    .greeting { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #0f172a; }
    .badge { display: inline-block; background: #e0e7ff; color: #4338ca; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; margin-bottom: 16px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin: 20px 0; }
    .card-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #cbd5e1; }
    .card-row:last-child { border-bottom: none; }
    .card-label { font-size: 13px; color: #64748b; font-weight: 500; }
    .card-val { font-size: 14px; color: #0f172a; font-weight: 700; font-family: monospace; }
    .highlight-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 18px; margin: 24px 0; text-align: center; }
    .btn { display: inline-block; background: #4f46e5; color: #ffffff !important; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 12px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); }
    .note { font-size: 12px; color: #64748b; margin-top: 20px; line-height: 1.5; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #ffffff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NyVer O'quv Markazi</h1>
      <p>Kelajak kasblarini biz bilan professional o'rganing</p>
    </div>
    <div class="content">
      <div class="badge">To'lov Tasdiqlandi ✓</div>
      <div class="greeting">Assalomu alaykum, ${studentName}!</div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Sizning <b>${courseName}</b> kursi uchun to'lovingiz markazimiz ma'muriyati tomonidan muvaffaqiyatli tasdiqlandi va siz uchun NyVer ERP tizimida shaxsiy talaba kabineti ochildi.
      </p>

      <div class="card">
        <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">To'lov Tafsilotlari</div>
        <div class="card-row">
          <span class="card-label">Kurs yo'nalishi:</span>
          <span class="card-val" style="font-family: inherit;">${courseName}</span>
        </div>
        <div class="card-row">
          <span class="card-label">To'langan summa:</span>
          <span class="card-val">${formattedAmount} so'm</span>
        </div>
        <div class="card-row">
          <span class="card-label">To'lov holati:</span>
          <span class="card-val" style="color: #16a34a;">Tasdiqlangan</span>
        </div>
      </div>

      <div class="highlight-box">
        <div style="font-size: 13px; font-weight: 700; color: #1e40af; margin-bottom: 12px;">Shaxsiy Kabinetga Kirish Ma'lumotlari</div>
        <div style="font-size: 14px; margin-bottom: 6px; color: #334155;">
          Login: <strong style="font-size: 16px; color: #0f172a; font-family: monospace;">${login}</strong>
        </div>
        ${password
            ? `<div style="font-size: 14px; margin-bottom: 14px; color: #334155;">
          Boshlang'ich Parol: <strong style="font-size: 16px; color: #4338ca; font-family: monospace; background: #e0e7ff; padding: 2px 8px; border-radius: 6px;">${password}</strong>
        </div>`
            : ''}
        <a href="http://localhost:5173/login" class="btn">Kabinetga Kirish →</a>
      </div>

      <p class="note">
        💡 <b>Maslahat:</b> Tizimga ilk bor kirganingizdan so'ng, shaxsiy profilingizga o'tib parolingizni o'zingiz uchun qulay yangi parolga o'zgartirib olishingiz mumkin.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} NyVer O'quv Markazi. Barcha huquqlar himoyalangan.<br>
      Savollaringiz bo'lsa, ma'muriyatimizga murojaat qiling.
    </div>
  </div>
</body>
</html>
    `;
        return this.dispatchMail({
            to,
            subject: `🎉 NyVer — Kurs to'lovingiz tasdiqlandi va shaxsiy kabinet ochildi!`,
            html: htmlContent,
            debugInfo: {
                type: 'WELCOME_CREDENTIALS',
                studentName,
                to,
                login,
                password: password || 'Mavjud parol',
                courseName,
                amount: `${formattedAmount} so'm`,
            },
        });
    }
    async sendEnrollmentConfirmationEmail(options) {
        const { to, studentName, courseName, amount } = options;
        const formattedAmount = Number(amount).toLocaleString('uz-UZ');
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>NyVer — Yangi Kursga Yozildingiz</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #4f46e5; padding: 30px; text-align: center; color: #ffffff; }
    .content { padding: 30px; }
    .btn { display: inline-block; background: #4f46e5; color: #ffffff !important; font-weight: 700; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0; font-size: 22px;">NyVer O'quv Markazi</h1>
      <p style="margin:5px 0 0; opacity:0.9;">Yangi kursga muvaffaqiyatli qo'shildingiz!</p>
    </div>
    <div class="content">
      <h3 style="margin-top:0;">Assalomu alaykum, ${studentName}!</h3>
      <p>Sizning <b>${courseName}</b> kursi uchun ${formattedAmount} so'm to'lovingiz tasdiqlandi va ushbu kurs sizning mavjud shaxsiy kabinetingizga qo'shildi.</p>
      <p>O'z akkauntingizga kirib, darslar jadvali, davomat va topshiriqlarni ko'rishingiz mumkin:</p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="http://localhost:5173/login" class="btn">Shaxsiy Kabinetga O'tish →</a>
      </div>
      <p style="font-size:12px; color:#64748b;">Mavjud login va parolingiz o'zgarmagan.</p>
    </div>
  </div>
</body>
</html>
    `;
        return this.dispatchMail({
            to,
            subject: `✓ NyVer — "${courseName}" kursiga to'lovingiz tasdiqlandi!`,
            html: htmlContent,
            debugInfo: {
                type: 'ENROLLMENT_CONFIRMATION',
                studentName,
                to,
                courseName,
                amount: `${formattedAmount} so'm`,
            },
        });
    }
    async sendAdminCreatedAccountEmail(to, fullName, login, setPasswordUrl) {
        const htmlContent = `
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NyVer — Akkauntingiz tayyor!</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f0f4ff; padding: 32px 16px; color: #1e293b; }
    .wrap { max-width: 580px; margin: 0 auto; }
    .card { background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(79,70,229,0.10); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 36px 30px; text-align: center; }
    .header h1 { color: #fff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.85); margin-top: 6px; font-size: 14px; }
    .body { padding: 32px 30px; }
    .greeting { font-size: 17px; font-weight: 600; color: #1e293b; margin-bottom: 12px; }
    .text { font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 20px; }
    .login-box { background: #f8faff; border: 1px solid #e0e7ff; border-radius: 12px; padding: 18px 20px; margin: 24px 0; }
    .login-box .label { font-size: 12px; font-weight: 600; color: #6366f1; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; }
    .login-box .value { font-size: 16px; font-weight: 700; color: #1e293b; font-family: 'Courier New', monospace; }
    .btn-wrap { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff !important; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 12px; text-decoration: none; letter-spacing: 0.2px; }
    .notice { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
    .footer { background: #f8faff; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="header">
        <h1>🎓 NyVer O'quv Markazi</h1>
        <p>Shaxsiy kabinetingiz yaratildi</p>
      </div>
      <div class="body">
        <p class="greeting">Assalomu alaykum, ${fullName}! 👋</p>
        <p class="text">Sizning NyVer O'quv Markazi tizimidagi shaxsiy akkauntingiz muvaffaqiyatli yaratildi. Quyida login ma'lumotingiz:</p>

        <div class="login-box">
          <div class="label">Login</div>
          <div class="value">${login}</div>
        </div>

        <p class="text">Tizimga kirish uchun avvalo parolingizni o'rnatishingiz kerak. Buning uchun quyidagi tugmani bosing:</p>

        <div class="btn-wrap">
          <a href="${setPasswordUrl}" class="btn">🔐 Parolni O'rnatish →</a>
        </div>

        <p class="notice">
          ⚠️ Ushbu havola <strong>24 soat</strong> davomida amal qiladi. Muddati o'tgach, ma'muriyatga murojaat qiling.<br><br>
          Agar siz bu xatni kutmagan bo'lsangiz, e'tibor bermang — hech qanday harakatni talab etmaydi.
        </p>
      </div>
      <div class="footer">
        © NyVer O'quv Markazi · Bu xat avtomatik yuborilgan
      </div>
    </div>
  </div>
</body>
</html>
    `;
        const textContent = `Assalomu alaykum, ${fullName}!

Sizning NyVer O'quv Markazi tizimidagi shaxsiy akkauntingiz muvaffaqiyatli yaratildi.

Login: ${login}
Parol o'rnatish havolasi: ${setPasswordUrl}

Ushbu havola 24 soat davomida amal qiladi. Havolaga o'tib o'z shaxsiy parolingizni belgilang.

© NyVer O'quv Markazi`;
        return this.dispatchMail({
            to,
            subject: `NyVer — Shaxsiy akkauntingiz yaratildi (Parolni faollashtirish)`,
            html: htmlContent,
            text: textContent,
            debugInfo: {
                type: 'ADMIN_CREATED_ACCOUNT',
                fullName,
                to,
                login,
                setPasswordUrl,
            },
        });
    }
    async dispatchMail(params) {
        const { to, subject, html, text, debugInfo } = params;
        this.logger.log(`
===================== [NYVER MAIL DISPATCH] =====================
Turi: ${debugInfo.type}
Kimga (To): ${to}
Mavzu: ${subject}
Talaba: ${debugInfo.fullName || debugInfo.studentName || '-'}
Login: ${debugInfo.login || '-'}
Vaqtinchalik Parol: ${debugInfo.password || '-'}
Havola: ${debugInfo.setPasswordUrl || '-'}
Kurs: ${debugInfo.courseName || '-'}
Summa: ${debugInfo.amount || '-'}
=================================================================
    `);
        if (!this.transporter) {
            this.logger.log(`[MOCK PREVIEW]: SMTP ulanmaganligi sababli xat real jo'natilmadi, lekin yuqoridagi konsolda to'liq qayd etildi.`);
            return true;
        }
        try {
            const res = await this.transporter.sendMail({
                from: this.mailFrom,
                replyTo: this.configService.get('MAIL_REPLY_TO') || 'noreply@nyver.uz',
                to,
                subject,
                text: text || html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
                html,
            });
            this.logger.log(`Real email muvaffaqiyatli yetkazildi: ${to} (MessageId: ${res.messageId})`);
            return true;
        }
        catch (err) {
            this.logger.error(`Real email yuborishda xatolik: ${err.message}`, err.stack);
            return false;
        }
    }
};
MailService = MailService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map