
import { MyContext } from 'src/types';
import { Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import argon2 from 'argon2'
import { User } from '../entity/user';

@InputType({ description: "Add new User" })
class UsernamePasswordInfo {
  @Field()
  username:string
  @Field()
  password:string
}
@ObjectType()
class UserResponse{
  @Field(()=>[FieldError!]!,{nullable:true})
  errors?:FieldError[]
  @Field(()=>User!,{nullable:true})
  user?:User
}
@ObjectType()
class FieldError{
  @Field(()=>String)
  message:string
  @Field(()=>String,{nullable:true})
  field:string
}
@Resolver()
export class UserResolver{
    @Mutation(()=>UserResponse)
    async register( @Arg('options',()=>UsernamePasswordInfo) options:UsernamePasswordInfo,
                    @Ctx() {em} : MyContext) : Promise<any> 
      { 
        let errors:FieldError[] = []
        if(options.username.length<=2)
          {
            errors.push({message:'Length must be greater than 2',field:'Username'})
          }
        if(options.password.length<=7)
          {
            errors.push({message:'Length must be greater than 7',field:'Password'})
          }
        if(errors.length>0)
          {
            return {errors}
          }
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User,{username:options.username,password:hashedPassword})
       try{
         await em.persistAndFlush(user)
       }
       catch(e){
          if(e.code=='23505')
          {
            errors.push({message:'Username already been taken !',field:"Username"})
            return {errors}
          }
          errors.push({message:'Somethig went wrong !', field:'Username/Password'})
       }
        return {user}
      }

      @Query(()=>UserResponse)
      async login( @Arg('options',()=>UsernamePasswordInfo) options:UsernamePasswordInfo,
                      @Ctx() {em} : MyContext) : Promise<any> 
        { 
          let errors:FieldError[] = []
          const user =await em.findOne(User,{username:options.username})
          if(!user)
            {
              errors.push({message:"Username doesn't exist !",field:'Username'})
              return {errors}
            }
          const isValid = await argon2.verify(user.password,options.password)
          if(!isValid)
            {
              errors.push({message:"Password is incorrect !",field:'Password'})
              return {errors}
            }

          return {user}
        }
}
