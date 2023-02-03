"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageException = exports.LoginCredentialsException = exports.PasswordResetTokenInvalidException = exports.ActivationTokenInvalidException = exports.UserNotFoundException = exports.EmailAlreadyUsedException = void 0;
const common_1 = require("@nestjs/common");
const EmailAlreadyUsedException = () => new common_1.BadRequestException("Email already in use.");
exports.EmailAlreadyUsedException = EmailAlreadyUsedException;
const UserNotFoundException = () => new common_1.NotFoundException("Requested user does not exist.");
exports.UserNotFoundException = UserNotFoundException;
const ActivationTokenInvalidException = () => new common_1.ForbiddenException("Activation token is invalid or has expired.");
exports.ActivationTokenInvalidException = ActivationTokenInvalidException;
const PasswordResetTokenInvalidException = () => new common_1.ForbiddenException("Password reset token is invalid or has expired.");
exports.PasswordResetTokenInvalidException = PasswordResetTokenInvalidException;
const LoginCredentialsException = () => new common_1.UnauthorizedException("Login credentials are wrong.");
exports.LoginCredentialsException = LoginCredentialsException;
const ErrorMessageException = (message) => new common_1.BadRequestException(message);
exports.ErrorMessageException = ErrorMessageException;
//# sourceMappingURL=exceptions.js.map