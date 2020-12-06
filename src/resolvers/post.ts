import { MyContext } from 'src/types';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'

import { Post } from './../entity/Post';

@Resolver()
export class PostResolver{
    @Query(()=>[Post])
    posts(
      @Ctx() {em} : MyContext) : Promise<any> 
      {
        return em.find(Post,{})
      }
  @Query(()=>Post,{nullable:true})
  getPost(
    @Arg('id',()=>Int) id :number,
    @Ctx() {em} : MyContext) : Promise<any> 
    {
      return em.findOne(Post,{id})
    }
    @Mutation(()=>Post,{nullable:true})
    async createPost(
      @Arg('title',
      ()=>String) title :string,
      @Ctx() {em} : MyContext) : Promise<any> 
      {
        const post = em.create(Post,{title})
        await em.persistAndFlush(post);
        return post;
      }
    @Mutation(()=>Post,{nullable:true})
    async updatePost(
      @Arg('title',()=>String) title : string,
      @Arg('id',()=>Int) id:number,
      @Ctx() {em} : MyContext) : Promise<any> 
      {
        const post =await em.findOne(Post,{id})
        if(!post)
        {
            return null
        }
        if(title)
        {
            post.title = title;
            post.updatedAt = new Date();
        }
        await em.persistAndFlush(post);
        return post;
      }
    @Mutation(()=>Boolean)
    async deletePost(
      @Arg('id',()=>Int) id:number,
      @Ctx() {em} : MyContext) : Promise<any> 
      {
        const post =await em.findOne(Post,{id})
        console.log(post)
        if(!post)
        {
            return false
        }
        await em.nativeDelete(Post,{id})
        return true;
      }
}
