import { User } from "../entity/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  public async getAllUsers() {
    return await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "post")
      .getMany();
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    return await User.create({
      name,
      posts: [],
      comments: [],
      postVotes: [],
      commentVotes: [],
    }).save();
  }
}
