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
import { Model, ObjectId } from "mongoose";
import { User } from "./user.interface";
import { UserMailerService } from "./user.mailer.service";
export declare class UserService {
    private readonly userModel;
    private readonly userMailer;
    constructor(userModel: Model<User>, userMailer: UserMailerService);
    create(email: string, password: string, userData: Partial<User>): Promise<User>;
    findById(id: ObjectId, hashPassword?: boolean): Promise<User>;
    getTagPeople(alreadyTagPeople: string[], search?: string): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    activate(userId: string, activationToken: string): Promise<Readonly<{
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
        password: string;
        passwordResetToken: string;
        passwordResetExpires: string;
        isActive: boolean;
        activationExpires: string;
        activationToken: string;
    }> & import("./user.interface").UserMethods & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    forgottenPassword(email: string): Promise<void>;
    resetPassword(email: string, passwordResetToken: string, password: string): Promise<Readonly<{
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
        password: string;
        passwordResetToken: string;
        passwordResetExpires: string;
        isActive: boolean;
        activationExpires: string;
        activationToken: string;
    }> & import("./user.interface").UserMethods & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changePassword(oldPassword: string, newPassword: string, userId: ObjectId): Promise<Readonly<{
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
        password: string;
        passwordResetToken: string;
        passwordResetExpires: string;
        isActive: boolean;
        activationExpires: string;
        activationToken: string;
    }> & import("./user.interface").UserMethods & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: ObjectId, updateDto: Partial<User>): Promise<User>;
}
