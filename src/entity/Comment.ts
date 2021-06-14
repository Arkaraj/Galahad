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

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  body: string;

  @Column("varchar")
  userid: string;
  @ManyToOne(() => User, (usr) => usr.comments)
  @JoinColumn({ name: "userid" })
  user: User;

  @Column("varchar")
  postid: string;
  @ManyToOne(() => Post, (pst) => pst.comments)
  @JoinColumn({ name: "postid" })
  post: Post;

  @Column("datetime")
  timestamp: Date;

  /**
   * I don't want to create complex comments under comments so i am gonna ommit out the reply to comments stuff
   */

  @Column("int", { default: 0 })
  likes: number;

  @Column("int", { default: 0 })
  dislikes: number;

  @OneToMany(() => CommentVote, (cv) => cv.comment)
  votes: CommentVote[];
}
