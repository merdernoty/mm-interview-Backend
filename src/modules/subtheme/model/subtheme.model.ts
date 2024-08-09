import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../../question/model/question.model";
import { Theme } from "../../theme/model/theme.model";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Subtheme {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  title: string;

  @Field(() => Theme)
  @ManyToOne(() => Theme, (theme) => theme.subthemes)
  theme: Theme;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.subtheme)
  questions: Question[];
}
