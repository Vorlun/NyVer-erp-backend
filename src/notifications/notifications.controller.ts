import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service.js';

export class BroadcastDto {
  id?: string;
  type!: 'BROADCAST' | 'HOMEWORK' | 'EXAM' | 'COIN' | 'ADMIN_REQUEST' | 'SYSTEM';
  target!: 'ALL' | 'STUDENTS' | 'TEACHERS' | 'ADMIN' | 'DEBTORS';
  title!: string;
  message!: string;
  channels?: string[];
  createdAt?: string;
  data?: Record<string, any>;
}

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('broadcast')
  @ApiOperation({ summary: 'Barcha foydalanuvchilar yoki ma\'lum guruhga xabar yuborish' })
  sendBroadcast(@Body() payload: BroadcastDto) {
    const result = this.notificationsService.sendBroadcast(payload);
    return {
      success: true,
      message: 'Xabar muvaffaqiyatli yuborildi',
      data: result,
    };
  }

  @Post('trigger-template')
  @ApiOperation({ summary: 'Doimiy tizim shablonini sinab ko\'rish yoki yuborish' })
  triggerTemplate(
    @Body()
    body: {
      templateKey: string;
      studentId?: string | number;
      score?: number;
      coins?: number;
      title?: string;
      customText?: string;
    },
  ) {
    let res;
    switch (body.templateKey) {
      case 'HOMEWORK_ASSIGNED':
        res = this.notificationsService.notifyHomeworkAssigned(
          body.studentId || 1,
          'Frontend Dasturlash',
          body.title || 'Vue 3 Reaktivlik topshirig\'i',
        );
        break;
      case 'HOMEWORK_REVIEWED':
        res = this.notificationsService.notifyHomeworkReviewed(
          body.studentId || 1,
          body.score || 95,
          body.coins || 3,
        );
        break;
      case 'EXAM_SCORED':
        res = this.notificationsService.notifyExamScored(
          body.studentId || 1,
          'Oraliq Nazorat Imtihoni',
          body.score || 88,
          body.coins || 2,
        );
        break;
      case 'COIN_AWARDED':
        res = this.notificationsService.notifyCoinsAwarded(
          body.studentId || 1,
          body.coins || 5,
          body.customText || ' Namunali dars faolligi uchun',
        );
        break;
      case 'ADMIN_REQUEST':
        res = this.notificationsService.notifyAdminRequest(
          'Yangi sovg\'a so\'rovi',
          body.customText || 'O\'quvchi Smart Termos sovg\'asini olish uchun so\'rov yubordi.',
        );
        break;
      case 'TEACHER_HOMEWORK_SUBMITTED':
        res = this.notificationsService.notifyTeacherHomeworkSubmitted(
          2,
          'Jasur Bekmirzayev',
          body.title || 'Vue Router Navigation Guards',
        );
        break;
      default:
        res = this.notificationsService.sendBroadcast({
          type: 'SYSTEM',
          target: 'ALL',
          title: 'Tizim xabarnomasi',
          message: body.customText || 'Nyver ta\'lim tizimidan bildirishnoma',
        });
    }

    return {
      success: true,
      data: res,
    };
  }
}
