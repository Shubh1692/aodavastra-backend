import {
  IsEmail,
  MinLength,
  MaxLength,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { Type } from "class-transformer";

// TODO add mixins like EmailField, PasswordField

export class ActivateParams {
  @ApiProperty({type: "ObjectID"})
  @IsNotEmpty()
  readonly userId!: string;

  @ApiProperty({type: "uuid"})
  @IsUUID()
  readonly activationToken!: string;
}

export class SocialLinks {
  @ApiProperty({example: "facebook"})
  @IsOptional()
  readonly facebook!: string;

  @ApiProperty({example: "instagram"})
  @IsOptional()
  readonly instagram!: string;

  @ApiProperty({example: "snapchat"})
  @IsOptional()
  readonly snapchat!: string;
}

export class SignUpDto {
  @ApiProperty({example: "noncreatror@yopmail.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({example: "123456789", minLength: 8})
  @MinLength(8)
  readonly password!: string;

  @ApiProperty({example: "name", minLength: 2})
  @MinLength(2)
  readonly name!: string;

  @ApiProperty({example: "bio"})
  @IsOptional()
  readonly bio!: string;

  @ApiProperty({example: false})
  @IsOptional()
  readonly isCreator!: boolean;

  @ApiProperty({
    example: {
      instagram: "link",
      facebook: "link",
      snapchat: "link",
    },
  })
  @IsOptional()
  readonly socialLinks!: SocialLinks;

  @ApiProperty({example: "phoneNo"})
  @IsOptional()
  readonly phoneNo!: string;

  @ApiProperty({example: "email"})
  @IsOptional()
  readonly provider!: string;

  @ApiProperty({example: "link"})
  @IsOptional()
  readonly profilePicture!: string;

  @ApiProperty({example: "link"})
  @IsOptional()
  readonly coverPicture!: string;
}

export class UserUpdateDto {
  @ApiProperty({example: "noncreatror@yopmail.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({example: "name", minLength: 2})
  @MinLength(2)
  readonly name!: string;

  @ApiProperty({example: "bio"})
  @IsOptional()
  readonly bio!: string;

  @ApiProperty({
    example: {
      instagram: "link",
      facebook: "link",
      snapchat: "link",
    },
  })
  @IsOptional()
  readonly socialLinks!: SocialLinks;

  @ApiProperty({example: "phoneNo"})
  @IsOptional()
  readonly phoneNo!: string;
}

export class UserCreatorDto {
  @ApiProperty({example: "noncreatror@yopmail.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({example: "name", minLength: 2})
  @MinLength(2)
  readonly name!: string;

  @ApiProperty({example: "bio"})
  @IsOptional()
  readonly bio!: string;

  @ApiProperty({
    example: {
      instagram: "link",
      facebook: "link",
      snapchat: "link",
    },
  })
  @IsOptional()
  readonly socialLinks!: SocialLinks;

  @ApiProperty({example: "phoneNo"})
  @IsOptional()
  readonly phoneNo!: string;
}
export class LoginDto {
  @ApiProperty({example: "noncreatror@yopmail.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({example: "123456789", minLength: 8})
  @MinLength(8)
  readonly password!: string;
}

export class ForgottenPasswordDto {
  @ApiProperty({example: "noncreatror@yopmail.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({example: "noncreatror@yopmail.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({type: "uuid"})
  @IsUUID()
  readonly passwordResetToken!: string;

  @ApiProperty({example: "password", minLength: 8})
  @MinLength(8)
  readonly password!: string;
}

export class ChangePasswordDto {
  @ApiProperty({example: "password"})
  @IsNotEmpty()
  @IsString()
  readonly oldPassword!: string;


  @ApiProperty({example: "newPassword", minLength: 8})
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly newPassword!: string;
}

export class TagPeopleQuery {
  @ApiProperty({ required: false})
  @IsOptional()
  @IsString()
  readonly search!: string;

  @ApiProperty({ required: false})
  @IsOptional()
  @IsArray()
  @Type(() => String)
  readonly alreadyTagPeople!: string[];
}