"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = exports.multerStorage = exports.destination = exports.MULTER_LOCAL_DESTINATION = void 0;
const fs_1 = require("fs");
const multer_1 = require("multer");
const exceptions_1 = require("./exceptions");
exports.MULTER_LOCAL_DESTINATION = "./uploads";
const destination = (req, file, cb) => {
    const uploadPath = exports.MULTER_LOCAL_DESTINATION;
    if (!(0, fs_1.existsSync)(uploadPath)) {
        (0, fs_1.mkdirSync)(uploadPath);
    }
    cb(null, uploadPath);
};
exports.destination = destination;
exports.multerStorage = process.env.AWS_ACCESS_KEY_ID ? (0, multer_1.memoryStorage)() : (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        const uploadPath = exports.MULTER_LOCAL_DESTINATION;
        if (!(0, fs_1.existsSync)(uploadPath)) {
            (0, fs_1.mkdirSync)(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
});
const imageFileFilter = (req, file, cb) => {
    const filenameArr = (file === null || file === void 0 ? void 0 : file.originalname.split(".")) || [];
    const ext = filenameArr[(filenameArr === null || filenameArr === void 0 ? void 0 : filenameArr.length) - 1] || "";
    const isValid = ["jpg", "jpeg", "png", "gif"].includes(ext);
    cb(!isValid ? (0, exceptions_1.ErrorMessageException)("Only image file can be supported") : null, isValid);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=multer.js.map