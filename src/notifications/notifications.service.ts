import { Injectable } from '@nestjs/common';
import { NotificationsGateway, WsNotificationPayload } from './notifications.gateway.js';

@Injectable()
export class NotificationsService {
  constructor(private readonly gateway: NotificationsGateway) {}

  sendBroadcast(payload: WsNotificationPayload) {
    return this.gateway.sendNotification(payload);
  }

  // ─── Automated System Notification Triggers ──────────────────────────────
  notifyHomeworkAssigned(studentId: string | number, courseName: string, title: string) {
    return this.gateway.sendNotification({
      type: 'HOMEWORK',
      target: 'STUDENTS',
      title: 'Yangi uyga vazifa yuklandi',
      message: `${courseName}: "${title}" topshirig'i berildi. Belgilangan muddatgacha topshiring.`,
      channels: ['IN_APP', 'SMS'],
      data: { studentId, courseName, title },
    });
  }

  notifyHomeworkReviewed(studentId: string | number, score: number, coins: number) {
    return this.gateway.sendNotification({
      type: 'HOMEWORK',
      target: 'STUDENTS',
      title: 'Uyga vazifangiz tekshirildi',
      message: `Topshiriq baholandi: ${score} ball! Sizga +${coins} Nyver Coin taqdim etildi.`,
      channels: ['IN_APP'],
      data: { studentId, score, coins },
    });
  }

  notifyExamScored(studentId: string | number, examName: string, score: number, coins: number) {
    return this.gateway.sendNotification({
      type: 'EXAM',
      target: 'STUDENTS',
      title: 'Imtihon natijasi e\'lon qilindi',
      message: `"${examName}": ${score} ball to'pladingiz (+${coins} coin).`,
      channels: ['IN_APP', 'SMS'],
      data: { studentId, examName, score, coins },
    });
  }

  notifyCoinsAwarded(studentId: string | number, amount: number, reasonText: string) {
    return this.gateway.sendNotification({
      type: 'COIN',
      target: 'STUDENTS',
      title: `+${amount} Nyver Coin berildi! 🪙`,
      message: `Tabriklaymiz! Sizning hisobingizga +${amount} coin qo'shildi. Sabab: ${reasonText}`,
      channels: ['IN_APP'],
      data: { studentId, amount, reasonText },
    });
  }

  notifyTeacherHomeworkSubmitted(teacherId: string | number, studentName: string, homeworkTitle: string) {
    return this.gateway.sendNotification({
      type: 'HOMEWORK',
      target: 'TEACHERS',
      title: 'Yangi uyga vazifa topshirildi',
      message: `${studentName} "${homeworkTitle}" topshirig'ini tekshirish uchun yubordi.`,
      channels: ['IN_APP'],
      data: { teacherId, studentName, homeworkTitle },
    });
  }

  notifyAdminRequest(title: string, message: string, data?: Record<string, any>) {
    return this.gateway.sendNotification({
      type: 'ADMIN_REQUEST',
      target: 'ADMIN',
      title,
      message,
      channels: ['IN_APP'],
      data,
    });
  }
}
