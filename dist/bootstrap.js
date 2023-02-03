"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = exports.configureApp = void 0;
const compression = require("compression");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("./common/swagger");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const configureApp = (app) => {
    if (config_1.default.cors) {
        app.enableCors(config_1.default.cors);
    }
    app.use(compression());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
};
exports.configureApp = configureApp;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, exports.configureApp)(app);
    (0, swagger_1.setupSwaggerDocuments)(app);
    await app.listen(process.env.PORT);
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map