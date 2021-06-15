import { Post } from "../entity/Post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Vote } from "../entity/Vote";
import { Comment } from "../entity/Comment";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getAllPosts() {
    return await Post.createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "athr")
      .leftJoinAndSelect("post.comments", "cmts") // order cmts.timestamp asc
      .leftJoinAndSelect("cmts.user", "usr")
      .orderBy("post.time", "DESC")
      .getMany();
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

  @Mutation(() => Post)
  async VotePost(
    @Arg("userid") userid: string,
    @Arg("postid") postid: string,
    @Arg("upvote") upvote: boolean
  ) {
    const vote = await Vote.findOne({ where: { userid, postid } });
    const post = await Post.findOne(postid);

    if (vote && post) {
      vote.upvote = upvote;
      vote.downvote = !upvote;

      await vote.save();

      const allVotes = await Vote.find({ where: { postid, upvote: true } });
      post.votes = allVotes.length;

      return await post!.save();
    } else {
      const newVote = await Vote.create({
        userid,
        postid,
        upvote,
        downvote: !upvote,
      }).save();
      await newVote.save();

      const allVotes = await Vote.find({ where: { postid, upvote: true } });
      post!.votes = allVotes.length;

      return await post!.save();
    }
  }

  @Query(() => [Comment])
  async viewAllComments(@Arg("postid") postid: string) {
    return await Comment.createQueryBuilder("cmt")
      .leftJoinAndSelect("cmt.user", "user")
      .where("cmt.postid = :postid", { postid })
      .orderBy("cmt.timestamp", "DESC")
      .getMany();
  }
}
