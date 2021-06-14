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

@Entity()
export class CommentVote extends BaseEntity {
  @PrimaryColumn()
  userid: string;

  @PrimaryColumn()
  commentid: string;

  @Column("boolean", { default: false })
  upvote: boolean;

  @Column("boolean", { default: false })
  downvote: boolean;

  @ManyToOne(() => User, (usr) => usr.commentVotes)
  @JoinColumn({ name: "userid" })
  user: User;

  @ManyToOne(() => Comment, (cmt) => cmt.votes)
  @JoinColumn({ name: "commentid" })
  comment: Comment;
}
