"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entity/Post");
const user_1 = require("./entity/user");
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post_1.Post, user_1.User],
    dbName: 'postgres',
    user: 'postgres',
    password: 'asdfg12345',
    debug: !constants_1.__prod__,
    type: 'postgresql'
};
//# sourceMappingURL=mikro-orm.config.js.map