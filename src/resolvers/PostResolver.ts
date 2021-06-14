import { Post } from "../entity/Post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getAllPosts() {
    return await Post.find();
  }

  // Mutations are used when we Update, Create stuff
  @Mutation(() => Post)
  async createPost(
    @Arg("userid") userid: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("content") content: string
  ) {
    return await Post.create({
      userid,
      title,
      description,
      content,
      time: new Date(),
    }).save();
  }
}
