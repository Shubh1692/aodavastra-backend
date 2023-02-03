import { S3 } from 'aws-sdk';
export declare class FileUploadService {
    upload(file: any): Promise<string>;
    uploadS3(fileFull: any, file: any, bucket: string, fileName: string): Promise<string>;
    deleteS3(fileUrl: string): Promise<void>;
    getS3(): S3;
}
