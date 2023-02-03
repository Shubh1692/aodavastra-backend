"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isDev,
    isProd,
    isTest,
    mail: {
        from: {
            name: "Your Name",
            address: "youremail@example.com",
        },
    },
    cors: {
        origin: '*',
        methods: "POST,GET,PUT,OPTIONS,DELETE",
        allowedHeaders: "Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization",
    },
    auth: {
        jwtTokenExpireInSec: "1d",
        passwordResetExpireInMs: 60 * 60 * 1000,
        activationExpireInMs: 24 * 60 * 60 * 1000,
        saltRounds: 10,
    },
    static: {
        maxAge: isProd() ? "1d" : 0,
    },
    websiteUrl: process.env.WEBSITE_URL || '',
    apiUrl: process.env.API_URL || ''
};
function isDev() {
    return process.env.NODE_ENV === "development";
}
function isProd() {
    return process.env.NODE_ENV === "production";
}
function isTest() {
    return process.env.NODE_ENV === "test";
}
//# sourceMappingURL=config.js.map