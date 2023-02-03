/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/inferschematype" />
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/user.interface";
import { ObjectId } from 'mongoose';
import { ActivateParams, ChangePasswordDto, ForgottenPasswordDto, ResetPasswordDto, SignUpDto, UserCreatorDto, UserUpdateDto } from "./auth.interface";
import { FileUploadService } from "../common/services/upload.service";
import { FollowerService } from "../follower/follower.service";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly fileUploadService;
    private readonly followerService;
    constructor(userService: UserService, jwtService: JwtService, fileUploadService: FileUploadService, followerService: FollowerService);
    validateUser(email: string, password: string): Promise<User>;
    validateUserById(id: ObjectId, password: string): Promise<User>;
    activate({ userId, activationToken }: ActivateParams): Promise<string>;
    getTagPeople(alreadyTagPeople: string[], search?: string): Promise<User[]>;
    login(user: User): Promise<{
        token: string;
        user: {
            following: number;
            followers: number;
            _id: import("mongoose").Schema.Types.ObjectId;
            name: string;
            bio: string;
            isCreator: boolean;
            socialLinks: {
                instagram: string;
                facebook: string;
                snapchat: string;
            };
            phoneNo: string;
            provider: string;
            profilePicture: string;
            coverPicture: string;
            email: string;
            isActive: boolean;
        };
    }>;
    signUpUser(userData: SignUpDto): Promise<{
        token: string;
        user: {
            following: number;
            followers: number;
            _id: import("mongoose").Schema.Types.ObjectId;
            name: string;
            bio: string;
            isCreator: boolean;
            socialLinks: {
                instagram: string;
                facebook: string;
                snapchat: string;
            };
            phoneNo: string;
            provider: string;
            profilePicture: string;
            coverPicture: string;
            email: string;
            isActive: boolean;
        };
    }>;
    forgottenPassword({ email }: ForgottenPasswordDto): Promise<void>;
    resetPassword({ email, passwordResetToken, password }: ResetPasswordDto): Promise<{
        token: string;
        user: Readonly<{
            _id: import("mongoose").Schema.Types.ObjectId;
            name: string;
            bio: string;
            isCreator: boolean;
            socialLinks: {
                instagram: string;
                facebook: string;
                snapchat: string;
            };
            phoneNo: string;
            provider: string;
            profilePicture: string;
            coverPicture: string;
            email: string;
            isActive: boolean;
        }>;
    }>;
    changePassword({ oldPassword, newPassword }: ChangePasswordDto, userId: ObjectId): Promise<{
        token: string;
        user: Readonly<{
            _id: import("mongoose").Schema.Types.ObjectId;
            name: string;
            bio: string;
            isCreator: boolean;
            socialLinks: {
                instagram: string;
                facebook: string;
                snapchat: string;
            };
            phoneNo: string;
            provider: string;
            profilePicture: string;
            coverPicture: string;
            email: string;
            isActive: boolean;
        }>;
    }>;
    update(userId: ObjectId, userDto: UserUpdateDto): Promise<User>;
    becomeCreator(userId: ObjectId, userDto: UserCreatorDto): Promise<User>;
    updatePicture(userId: ObjectId, profilePicture: Express.Multer.File | null, coverPicture: Express.Multer.File | null): Promise<User>;
    getUserProfile(user: User): Promise<{
        user: {
            following: number;
            followers: number;
            _id: import("mongoose").Schema.Types.ObjectId;
            name: string;
            bio: string;
            isCreator: boolean;
            socialLinks: {
                instagram: string;
                facebook: string;
                snapchat: string;
            };
            phoneNo: string;
            provider: string;
            profilePicture: string;
            coverPicture: string;
            email: string;
            isActive: boolean;
        };
        token: string;
    }>;
}
