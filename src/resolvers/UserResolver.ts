import { User } from "../entity/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { CommentVote } from "../entity/CommentVote";

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

  @Query(() => [Post])
  async getSpecificUserPost(@Arg("userid") userid: string) {
    return await Post.find({ where: { userid } });
  }

  @Mutation(() => Comment)
  async commentOnPost(
    @Arg("postid") postid: string,
    @Arg("userid") userid: string,
    @Arg("body") body: string
  ) {
    return await Comment.create({
      userid,
      postid,
      body,
      timestamp: new Date(),
    }).save();
  }

  @Mutation(() => Comment)
  async voteOnComments(
    @Arg("userid") userid: string,
    @Arg("commentid") commentid: string,
    @Arg("upvote") upvote: boolean
  ) {
    const cv = await CommentVote.findOne({ where: { userid, commentid } });
    const comment = await Comment.findOne(commentid);

    if (cv && comment) {
      cv.upvote = upvote;
      cv.downvote = !upvote;

      await cv.save();

      const allCommentVotes = await CommentVote.find({ where: { commentid } });
      comment.likes = allCommentVotes.filter(
        (cmt) => cmt.upvote === true
      ).length;
      comment.dislikes = allCommentVotes.filter(
        (cmt) => cmt.upvote !== true
      ).length;

      return await comment!.save();
    } else {
      const newCommentVote = await CommentVote.create({
        userid,
        commentid,
        upvote,
        downvote: !upvote,
      }).save();
      await newCommentVote.save();

      const allCommentVotes = await CommentVote.find({ where: { commentid } });
      comment!.likes = allCommentVotes.filter(
        (cmt) => cmt.upvote === true
      ).length;
      comment!.dislikes = allCommentVotes.filter(
        (cmt) => cmt.upvote !== true
      ).length;
      return await comment!.save();
    }
  }
}
