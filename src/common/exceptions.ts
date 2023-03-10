import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException
} from "@nestjs/common";

export const EmailAlreadyUsedException = () =>
  new BadRequestException("Email already in use.");

export const UserNotFoundException = () =>
  new NotFoundException("Requested user does not exist.");

export const ActivationTokenInvalidException = () =>
  new ForbiddenException("Activation token is invalid or has expired.");

export const PasswordResetTokenInvalidException = () =>
  new ForbiddenException("Password reset token is invalid or has expired.");

export const LoginCredentialsException = () =>
  new UnauthorizedException("Login credentials are wrong.");
  

export const ErrorMessageException = (message: string) =>
  new BadRequestException(message);
