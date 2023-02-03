"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogsDirectory = void 0;
const path = require("path");
const fs = require("fs");
const lodash_1 = require("lodash");
exports.createLogsDirectory = (0, lodash_1.once)(() => {
    const logDirectory = process.env.LOG_DIR || path.resolve("./logs");
    try {
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    }
    catch (e) {
        console.error(`Cannot create log directory: ${e}`);
    }
    return logDirectory;
});
//# sourceMappingURL=helpers.js.map