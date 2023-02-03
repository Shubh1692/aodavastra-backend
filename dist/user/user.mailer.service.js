"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMailerService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nest-modules/mailer");
const config_1 = require("../config");
let UserMailerService = class UserMailerService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    sendActivationMail(email, userId, activationToken, origin = config_1.default.apiUrl) {
        if (!config_1.default.isTest()) {
            this.mailerService
                .sendMail({
                to: email,
                subject: "Activate your account",
                text: `Please click on the following link, or paste this into your browser to activate your account:\n
${origin}/user/activate/${userId}/${activationToken}\n`,
            })
                .catch();
        }
    }
    sendForgottenPasswordMail(to, passwordResetToken, origin = config_1.default.websiteUrl) {
        if (!config_1.default.isTest()) {
            this.mailerService
                .sendMail({
                to,
                subject: "Reset your password",
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
Please click on the following link, or paste this into your browser to complete the process:\n
${origin}/password-reset-confirm/${passwordResetToken}/\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            })
                .catch();
        }
    }
    sendResetPasswordMail(email) {
        if (!config_1.default.isTest()) {
            this.mailerService
                .sendMail({
                to: email,
                subject: "Your password has been changed",
                text: `Hello,\n\nThis is a confirmation that the password for your account ${email} has just been changed.\n`,
            })
                .catch();
        }
    }
};
UserMailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], UserMailerService);
exports.UserMailerService = UserMailerService;
//# sourceMappingURL=user.mailer.service.js.map