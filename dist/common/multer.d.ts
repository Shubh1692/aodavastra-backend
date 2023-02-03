/// <reference types="multer" />
/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="compression" />
import { Request } from "express";
export declare const MULTER_LOCAL_DESTINATION = "./uploads";
export declare const destination: (req: any, file: any, cb: any) => void;
export declare const multerStorage: import("multer").StorageEngine;
export declare const imageFileFilter: (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => void;
