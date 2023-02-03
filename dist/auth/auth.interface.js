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
exports.TagPeopleQuery = exports.ChangePasswordDto = exports.ResetPasswordDto = exports.ForgottenPasswordDto = exports.LoginDto = exports.UserCreatorDto = exports.UserUpdateDto = exports.SignUpDto = exports.SocialLinks = exports.ActivateParams = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class ActivateParams {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: "ObjectID" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ActivateParams.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ActivateParams.prototype, "activationToken", void 0);
exports.ActivateParams = ActivateParams;
class SocialLinks {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "facebook" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SocialLinks.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "instagram" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SocialLinks.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "snapchat" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SocialLinks.prototype, "snapchat", void 0);
exports.SocialLinks = SocialLinks;
class SignUpDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "noncreatror@yopmail.com", maxLength: 255 }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123456789", minLength: 8 }),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "name", minLength: 2 }),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bio" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SignUpDto.prototype, "isCreator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            instagram: "link",
            facebook: "link",
            snapchat: "link",
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SocialLinks)
], SignUpDto.prototype, "socialLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "phoneNo" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "email" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "link" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "link" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "coverPicture", void 0);
exports.SignUpDto = SignUpDto;
class UserUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "noncreatror@yopmail.com", maxLength: 255 }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "name", minLength: 2 }),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bio" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            instagram: "link",
            facebook: "link",
            snapchat: "link",
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SocialLinks)
], UserUpdateDto.prototype, "socialLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "phoneNo" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "phoneNo", void 0);
exports.UserUpdateDto = UserUpdateDto;
class UserCreatorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "noncreatror@yopmail.com", maxLength: 255 }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserCreatorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "name", minLength: 2 }),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], UserCreatorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bio" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserCreatorDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            instagram: "link",
            facebook: "link",
            snapchat: "link",
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SocialLinks)
], UserCreatorDto.prototype, "socialLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "phoneNo" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserCreatorDto.prototype, "phoneNo", void 0);
exports.UserCreatorDto = UserCreatorDto;
class LoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "noncreatror@yopmail.com", maxLength: 255 }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123456789", minLength: 8 }),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
class ForgottenPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "noncreatror@yopmail.com", maxLength: 255 }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ForgottenPasswordDto.prototype, "email", void 0);
exports.ForgottenPasswordDto = ForgottenPasswordDto;
class ResetPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "noncreatror@yopmail.com", maxLength: 255 }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "passwordResetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password", minLength: 8 }),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
class ChangePasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "newPassword", minLength: 8 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
exports.ChangePasswordDto = ChangePasswordDto;
class TagPeopleQuery {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TagPeopleQuery.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], TagPeopleQuery.prototype, "alreadyTagPeople", void 0);
exports.TagPeopleQuery = TagPeopleQuery;
//# sourceMappingURL=auth.interface.js.map