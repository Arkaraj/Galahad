import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@ObjectType()
@Entity()
export class CommentVote extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userid: string;

  @Field()
  @PrimaryColumn()
  commentid: string;

  @Field()
  @Column("boolean", { default: false })
  upvote: boolean;

  @Field()
  @Column("boolean", { default: false })
  downvote: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.commentVotes)
  @JoinColumn({ name: "userid" })
  user: User;

  @Field(() => Comment)
  @ManyToOne(() => Comment, (cmt) => cmt.votes)
  @JoinColumn({ name: "commentid" })
  comment: Comment;
}
