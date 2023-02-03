import { MailerService } from "@nest-modules/mailer";
export declare class UserMailerService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendActivationMail(email: string, userId: string, activationToken: string, origin?: string): void;
    sendForgottenPasswordMail(to: string, passwordResetToken: string, origin?: string): void;
    sendResetPasswordMail(email: string): void;
}
