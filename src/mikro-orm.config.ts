import { MikroORM } from '@mikro-orm/core';
import { Post } from "./entity/Post";
import { User } from './entity/user';
import { __prod__ } from "./constants";
import path from 'path';

export default {
    migrations:{
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities:[Post,User],
    dbName:'postgres'
    ,user:'postgres',
    password:'asdfg12345',
    debug: !__prod__ ,
    type:'postgresql' 
} as Parameters<typeof MikroORM.init>[0]
