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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Request } from "express";
import { ActivateParams, ForgottenPasswordDto, ResetPasswordDto, SignUpDto, LoginDto, UserUpdateDto, ChangePasswordDto, UserCreatorDto, TagPeopleQuery } from "./auth.interface";
import { AuthService } from "./auth.service";
import { User } from "../user/user.interface";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    activate(params: ActivateParams, userId: string): Promise<string>;
    getCreatorUsers(tagPeopleQuery: TagPeopleQuery): Promise<User[]>;
    login(req: Request, loginDto: LoginDto): Promise<{
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
    signup(signUpDto: SignUpDto): Promise<{
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
    getProfile(req: Request): Promise<{
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
    relogin(req: Request): Promise<{
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
    forgottenPassword(body: ForgottenPasswordDto): Promise<void>;
    resetPassword(body: ResetPasswordDto): Promise<{
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
    update(body: UserUpdateDto, req: Request): Promise<User>;
    becomeCreator(body: UserCreatorDto, req: Request): Promise<User>;
    changePassword(body: ChangePasswordDto, req: Request): Promise<{
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
    updateProfilePicture(file: Express.Multer.File, req: Request): Promise<User>;
    updateCoverPicture(file: Express.Multer.File, req: Request): Promise<User>;
}
