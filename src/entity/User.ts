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

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => Post, (pst) => pst.author)
  posts: Array<Post>;

  @OneToMany(() => Comment, (cmt) => cmt.user)
  comments: Array<Comment>;

  @OneToMany(() => Vote, (vt) => vt.user)
  postVotes: Vote[];

  @OneToMany(() => CommentVote, (cv) => cv.user)
  commentVotes: CommentVote[];
}
