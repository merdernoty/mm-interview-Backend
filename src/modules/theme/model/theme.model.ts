import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../../question/model/question.model";

@ObjectType()
@Entity()
export class Theme {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  @ApiProperty({ description: "Title" })
  title: string;

  @Field()
  @Column({ nullable: false })
  @ApiProperty({ description: "Description" })
  description: string;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.theme)
  @ApiProperty({ description: "List of questions" })
  questions: Question[];
}
