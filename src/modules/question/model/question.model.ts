import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Theme } from "../../theme/model/theme.model";
import { Subtheme } from "../../subtheme/model/subtheme.model";
import { Difficulty } from "../enum/difficulty.enum";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: "Question" })
  @Field()
  question: string;

  @Column("simple-array", { nullable: false })
  @ApiProperty({ description: "List of answers" })
  @Field(() => [String])
  answers: string[];

  @Column({
    type: "enum",
    enum: Difficulty,
    default: Difficulty.EASY,
  })
  @ApiProperty({ description: "Difficulty level" })
  @Field(() => Difficulty)
  difficulty: Difficulty;

  @ManyToOne(() => Subtheme, (subtheme) => subtheme.questions)
  @Field(() => Subtheme)
  subtheme: Subtheme;
}
