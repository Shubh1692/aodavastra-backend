"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalAccessLogger = void 0;
const core_1 = require("@nestjs/core");
const nest_morgan_1 = require("nest-morgan");
const rotating_file_stream_1 = require("rotating-file-stream");
const config_1 = require("../config");
const helpers_1 = require("./helpers");
exports.GlobalAccessLogger = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: config_1.default.isDev() || config_1.default.isTest()
        ? (0, nest_morgan_1.MorganInterceptor)("dev")
        : (0, nest_morgan_1.MorganInterceptor)("combined", {
            skip: (_, res) => res.statusCode < 400,
            stream: (0, rotating_file_stream_1.default)("access.log", {
                path: (0, helpers_1.createLogsDirectory)(),
                interval: "1d",
                maxFiles: 10,
            }),
        }),
};
//# sourceMappingURL=accessLogger.js.map