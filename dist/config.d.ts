declare const _default: {
    isDev: typeof isDev;
    isProd: typeof isProd;
    isTest: typeof isTest;
    mail: {
        from: {
            name: string;
            address: string;
        };
    };
    cors: {
        origin: string;
        methods: string;
        allowedHeaders: string;
    };
    auth: {
        jwtTokenExpireInSec: string;
        passwordResetExpireInMs: number;
        activationExpireInMs: number;
        saltRounds: number;
    };
    static: {
        maxAge: string | number;
    };
    websiteUrl: string;
    apiUrl: string;
};
export default _default;
declare function isDev(): boolean;
declare function isProd(): boolean;
declare function isTest(): boolean;
