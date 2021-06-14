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

@Entity()
export class Vote extends BaseEntity {
  @PrimaryColumn()
  userid: string;

  @PrimaryColumn()
  postid: string;

  @Column("boolean", { default: false })
  upvote: boolean;

  @Column("boolean", { default: false })
  downvote: boolean;

  @ManyToOne(() => User, (usr) => usr.postVotes)
  @JoinColumn({ name: "userid" })
  user: User;

  @ManyToOne(() => Post, (pt) => pt.vote)
  @JoinColumn({ name: "postid" })
  post: Post;
}
