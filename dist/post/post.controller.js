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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const post_service_1 = require("./post.service");
const swagger_1 = require("@nestjs/swagger");
const post_interface_1 = require("./post.interface");
const multer_1 = require("../common/multer");
const platform_express_1 = require("@nestjs/platform-express");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    posts(req, { page, itemsPerPage }) {
        return this.postService.findPosts(page, itemsPerPage);
    }
    post(id, req) {
        const user = req.user;
        return this.postService.findById(id);
    }
    addPost(req, media, postDto) {
        const user = req.user;
        return this.postService.create(user._id, postDto, media);
    }
    async updatePost(media, req, postDto, id) {
        const user = req.user;
        return this.postService.update(id, user._id, postDto, media);
    }
};
__decorate([
    (0, common_1.Get)(""),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_interface_1.PaginationParams]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "posts", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "post", null);
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                description: { type: 'string' },
                tagPeople: {
                    type: 'array', properties: {
                        items: {
                            type: 'string'
                        }
                    }
                },
                tagProduct: {
                    type: 'array', properties: {
                        items: {
                            type: 'string'
                        }
                    }
                },
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer_1.multerStorage,
        fileFilter: multer_1.imageFileFilter,
    })),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)("file")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, post_interface_1.PostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addPost", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                description: { type: 'string' },
                tagPeople: {
                    type: 'array', properties: {
                        items: {
                            type: 'string'
                        }
                    }
                },
                tagProduct: {
                    type: 'array', properties: {
                        items: {
                            type: 'string'
                        }
                    }
                },
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer_1.multerStorage,
        fileFilter: multer_1.imageFileFilter,
    })),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.UploadedFile)("file")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, post_interface_1.PostDto, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)("post"),
    (0, common_1.Controller)("post"),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map