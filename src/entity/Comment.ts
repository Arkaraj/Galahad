import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommentVote } from "./CommentVote";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  body: string;

  @Field()
  @Column("varchar")
  userid: string;
  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.comments)
  @JoinColumn({ name: "userid" })
  user: User;

  @Field()
  @Column("varchar")
  postid: string;
  @Field(() => Post)
  @ManyToOne(() => Post, (pst) => pst.comments)
  @JoinColumn({ name: "postid" })
  post: Post;

  @Field()
  @Column("datetime")
  timestamp: Date;

  /**
   * I don't want to create complex comments under comments so i am gonna ommit out the reply to comments stuff
   */

  @Field(() => Int)
  @Column("int", { default: 0 })
  likes: number;

  @Field(() => Int)
  @Column("int", { default: 0 })
  dislikes: number;

  @Field(() => CommentVote)
  @OneToMany(() => CommentVote, (cv) => cv.comment)
  votes: CommentVote[];
}
