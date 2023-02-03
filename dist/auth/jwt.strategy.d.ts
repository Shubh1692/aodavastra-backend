import { Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/user.interface";
import { ObjectId } from 'mongoose';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: {
        sub: ObjectId;
    }): Promise<User>;
}
export {};
