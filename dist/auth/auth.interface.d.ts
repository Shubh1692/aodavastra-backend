export declare class ActivateParams {
    readonly userId: string;
    readonly activationToken: string;
}
export declare class SocialLinks {
    readonly facebook: string;
    readonly instagram: string;
    readonly snapchat: string;
}
export declare class SignUpDto {
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly bio: string;
    readonly isCreator: boolean;
    readonly socialLinks: SocialLinks;
    readonly phoneNo: string;
    readonly provider: string;
    readonly profilePicture: string;
    readonly coverPicture: string;
}
export declare class UserUpdateDto {
    readonly email: string;
    readonly name: string;
    readonly bio: string;
    readonly socialLinks: SocialLinks;
    readonly phoneNo: string;
}
export declare class UserCreatorDto {
    readonly email: string;
    readonly name: string;
    readonly bio: string;
    readonly socialLinks: SocialLinks;
    readonly phoneNo: string;
}
export declare class LoginDto {
    readonly email: string;
    readonly password: string;
}
export declare class ForgottenPasswordDto {
    readonly email: string;
}
export declare class ResetPasswordDto {
    readonly email: string;
    readonly passwordResetToken: string;
    readonly password: string;
}
export declare class ChangePasswordDto {
    readonly oldPassword: string;
    readonly newPassword: string;
}
export declare class TagPeopleQuery {
    readonly search: string;
    readonly alreadyTagPeople: string[];
}
