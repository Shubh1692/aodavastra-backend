"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const aws_sdk_1 = require("aws-sdk");
const common_1 = require("@nestjs/common");
let FileUploadService = class FileUploadService {
    async upload(file) {
        const { originalname } = file;
        const bucketS3 = process.env.BUCKET_NAME || '';
        return this.uploadS3(file, file.buffer, bucketS3, originalname);
    }
    async uploadS3(fileFull, file, bucket, fileName) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: `${new Date().getTime()}_${fileName}`,
            Body: file,
            ContentType: fileFull.mimetype.includes('audio') ? 'audio/mp3' : fileFull.mimetype,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err.message);
                }
                resolve((data === null || data === void 0 ? void 0 : data.Location) || '');
            });
        });
    }
    async deleteS3(fileUrl) {
        const fileName = fileUrl.split('.com/')[fileUrl.split('.com/').length - 1];
        const s3 = this.getS3();
        const params = {
            Bucket: process.env.BUCKET_NAME || '',
            Key: fileName,
        };
        return new Promise((resolve, reject) => {
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    console.info('error ====>', err);
                }
                resolve(data);
            });
        });
    }
    getS3() {
        return new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
};
FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=upload.service.js.map