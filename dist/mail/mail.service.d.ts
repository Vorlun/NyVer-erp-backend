import { ConfigService } from '@nestjs/config';
export interface WelcomeCredentialsOptions {
    to: string;
    studentName: string;
    login: string;
    password?: string;
    courseName: string;
    amount: number | string;
}
export interface EnrollmentConfirmationOptions {
    to: string;
    studentName: string;
    courseName: string;
    amount: number | string;
}
export declare class MailService {
    private configService;
    private readonly logger;
    private transporter;
    private readonly mailFrom;
    constructor(configService: ConfigService);
    sendWelcomeCredentialsEmail(options: WelcomeCredentialsOptions): Promise<boolean>;
    sendEnrollmentConfirmationEmail(options: EnrollmentConfirmationOptions): Promise<boolean>;
    sendAdminCreatedAccountEmail(to: string, fullName: string, login: string, setPasswordUrl: string): Promise<boolean>;
    private dispatchMail;
}
