"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("../common/exceptions");
const upload_service_1 = require("../common/services/upload.service");
const config_1 = require("../config");
const lodash_1 = require("lodash");
let PostService = class PostService {
    constructor(postModel, fileUploadService) {
        this.postModel = postModel;
        this.fileUploadService = fileUploadService;
    }
    searchForPosts(search, offset, limit) {
        throw new Error("Method not implemented.");
    }
    getAllPosts(offset, limit) {
        throw new Error("Method not implemented.");
    }
    async findPosts(page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        const posts = await this.postModel
            .aggregate([
            {
                $match: {
                    isActive: true,
                },
            },
            { $skip: offset },
            { $limit: itemsPerPage },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    pipeline: [{ $match: { isActive: true } }],
                    as: "comments",
                },
            },
        ])
            .sort({ updatedAt: -1 });
        const postsWithPopulatedData = await this.postModel.populate(posts, [
            {
                path: "tagPeople",
                select: { name: 1, bio: 1, _id: 1 },
                match: { isCreator: true },
            },
            { path: "tagProduct", select: { name: 1, _id: 1 }, match: { isActive: true } },
        ]);
        const total = await this.postModel.count({
            isActive: true,
        });
        return {
            itemsPerPage,
            total,
            data: postsWithPopulatedData,
            page,
        };
    }
    async findById(_id) {
        const post = await this.postModel.findOne({
            _id,
            isActive: true,
        });
        if (!post) {
            throw (0, exceptions_1.ErrorMessageException)("User unable to fetch post");
        }
        return post;
    }
    async create(userId, postDto, media) {
        var _a, _b;
        let tagPeople = [], tagProduct = [];
        if (postDto.tagPeople) {
            tagPeople = (0, lodash_1.uniq)(((_a = postDto.tagPeople) === null || _a === void 0 ? void 0 : _a.split(",")) || []);
        }
        if (postDto.tagProduct) {
            tagProduct = (0, lodash_1.uniq)(((_b = postDto.tagProduct) === null || _b === void 0 ? void 0 : _b.split(",")) || []);
        }
        if (!tagProduct.length) {
            throw (0, exceptions_1.ErrorMessageException)("Post required at least one prodct");
        }
        const imageUrlObj = {};
        if (media && process.env.AWS_ACCESS_KEY_ID) {
            imageUrlObj.media = await this.fileUploadService.upload(media);
        }
        else if (media) {
            imageUrlObj.media = `${config_1.default.apiUrl}/uploads/${media.filename}`;
            imageUrlObj.type = media.mimetype.includes("video") ? "video" : "image";
        }
        const post = await this.postModel.create(Object.assign(Object.assign(Object.assign({}, postDto), imageUrlObj), { tagPeople,
            tagProduct,
            userId }));
        return post;
    }
    async update(_id, userId, postDto, media) {
        var _a, _b;
        let tagPeople = [], tagProduct = [];
        if (postDto.tagPeople) {
            tagPeople = (0, lodash_1.uniq)(((_a = postDto.tagPeople) === null || _a === void 0 ? void 0 : _a.split(",")) || []);
        }
        if (postDto.tagProduct) {
            tagProduct = (0, lodash_1.uniq)(((_b = postDto.tagProduct) === null || _b === void 0 ? void 0 : _b.split(",")) || []);
        }
        if (!tagProduct.length) {
            throw (0, exceptions_1.ErrorMessageException)("Post required at least one prodct");
        }
        const imageUrlObj = {};
        if (media && process.env.AWS_ACCESS_KEY_ID) {
            imageUrlObj.media = await this.fileUploadService.upload(media);
        }
        else if (media) {
            imageUrlObj.media = `${config_1.default.apiUrl}/uploads/${media.filename}`;
            imageUrlObj.type = media.mimetype.includes("video") ? "video" : "image";
        }
        const post = await this.postModel.findOneAndUpdate({
            _id,
            isActive: true,
            userId,
        }, Object.assign(Object.assign(Object.assign({}, postDto), imageUrlObj), { tagPeople,
            tagProduct }));
        if (!post) {
            throw (0, exceptions_1.ErrorMessageException)("User unable to fetch post");
        }
        return post;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Post")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        upload_service_1.FileUploadService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map