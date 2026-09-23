import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { RoomsModule } from './rooms/rooms.module.js';
import { GroupsModule } from './groups/groups.module.js';
import { LessonsModule } from './lessons/lessons.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { HomeworkModule } from './homework/homework.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { GamificationModule } from './gamification/gamification.module.js';
import { ExamsModule } from './exams/exams.module.js';
import { MailModule } from './mail/mail.module.js';
import { ContactsModule } from './contacts/contacts.module.js';
import { StudentModule } from './student/student.module.js';
import { TeacherModule } from './teacher/teacher.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    MailModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    RoomsModule,
    GroupsModule,
    LessonsModule,
    AttendanceModule,
    HomeworkModule,
    PaymentsModule,
    GamificationModule,
    ExamsModule,
    ContactsModule,
    StudentModule,
    TeacherModule,
  ],
})
export class AppModule {}
