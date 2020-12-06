import { ApolloServer } from "apollo-server-express"
import {MikroORM} from "@mikro-orm/core"
import { PostResolver } from './resolvers/post';
import { UserResolver } from "./resolvers/user";
import { buildSchema } from "type-graphql"
import express from 'express'
import microConfig from './mikro-orm.config'

const main = async ()=>{
    try{
        const orm = await MikroORM.init(microConfig);
        orm.getMigrator().up()
        const app =express()
        const PORT= 4000
        const apolloServer =new ApolloServer({
            schema:await buildSchema({
                resolvers:[PostResolver,UserResolver],
                validate:false,  
            }),
            context:()=>({em:orm.em})
        })
        apolloServer.applyMiddleware({app})
        app.listen(PORT,()=>{
            console.log(`Listening to ${PORT}`)
        })
    }
    catch(e){
             console.log(e)
            }
    }
main(); 
