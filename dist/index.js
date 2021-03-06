"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const core_1 = require("@mikro-orm/core");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const type_graphql_1 = require("type-graphql");
const express_1 = __importDefault(require("express"));
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
        orm.getMigrator().up();
        const app = express_1.default();
        const PORT = 4000;
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [post_1.PostResolver, user_1.UserResolver],
                validate: false,
            }),
            context: () => ({ em: orm.em })
        });
        apolloServer.applyMiddleware({ app });
        app.listen(PORT, () => {
            console.log(`Listening to ${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
main();
//# sourceMappingURL=index.js.map