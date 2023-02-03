import { Request } from "express";
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => boolean;
export declare const getOriginHeader: ({ headers: { origin } }: Request) => string;
