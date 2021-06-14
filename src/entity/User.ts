import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Comment } from "./Comment";
import { CommentVote } from "./CommentVote";
import { Post } from "./Post";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar")
  name: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (pst) => pst.author)
  posts: Array<Post>;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (cmt) => cmt.user)
  comments: Array<Comment>;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vt) => vt.user)
  postVotes: Vote[];

  @Field(() => [CommentVote])
  @OneToMany(() => CommentVote, (cv) => cv.user)
  commentVotes: CommentVote[];
}
