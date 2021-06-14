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
import { Comment } from "./Comment";
import { User } from "./User";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar")
  title: string;

  @Field()
  @Column("varchar")
  description: string;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column("datetime")
  time: Date;

  @Field()
  @Column("varchar")
  userid: string;
  // Only single author
  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.posts)
  @JoinColumn({ name: "userid" })
  author: User;

  @Field(() => Int)
  @Column("int", { default: 0 })
  votes: number; // say this is only for upvotes count

  @Field(() => [Comment])
  @OneToMany(() => Comment, (cmt) => cmt.post)
  comments: Comment[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vt) => vt.post)
  vote: Vote[];
}
