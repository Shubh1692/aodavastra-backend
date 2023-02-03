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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParams = exports.PostDto = exports.PostType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var PostType;
(function (PostType) {
    PostType["IMAGE"] = "image";
    PostType["VIDEO"] = "video";
})(PostType = exports.PostType || (exports.PostType = {}));
class PostDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "description1" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "tag-people" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostDto.prototype, "tagPeople", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "tag-product" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostDto.prototype, "tagProduct", void 0);
exports.PostDto = PostDto;
class PaginationParams {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationParams.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PaginationParams.prototype, "itemsPerPage", void 0);
exports.PaginationParams = PaginationParams;
//# sourceMappingURL=post.interface.js.map