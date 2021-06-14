import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userid: string;

  @Field()
  @PrimaryColumn()
  postid: string;

  @Field()
  @Column("boolean", { default: false })
  upvote: boolean;

  @Field()
  @Column("boolean", { default: false })
  downvote: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.postVotes)
  @JoinColumn({ name: "userid" })
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (pt) => pt.vote)
  @JoinColumn({ name: "postid" })
  post: Post;
}
