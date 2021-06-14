import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  title: string;

  @Column("varchar")
  description: string;

  @Column("text")
  content: string;

  @Column("datetime")
  time: Date;

  @Column("varchar")
  userid: string;
  // Only single author
  @ManyToOne(() => User, (usr) => usr.posts)
  @JoinColumn({ name: "userid" })
  author: User;

  @Column()
  votes: number;

  @OneToMany(() => Comment, (cmt) => cmt.post)
  comments: Comment;

  @OneToMany(() => Vote, (vt) => vt.post)
  vote: Vote[];
}
