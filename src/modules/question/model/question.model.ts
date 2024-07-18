import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Theme } from "../../theme/model/theme.model";
import { Subtheme } from "../../subtheme/model/subtheme.model";
import { Difficulty } from "../enum/difficulty.enum";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: "Question" })
  question: string;

  @Column("simple-array", { nullable: false })
  @ApiProperty({ description: "List of answers" })
  answers: string[];

  @Column({
    type: "enum",
    enum: Difficulty,
    default: Difficulty.EASY,
  })
  @ApiProperty({ description: "Difficulty level" })
  difficulty: Difficulty;

  @ManyToOne(() => Subtheme, (subtheme) => subtheme.questions)
  subtheme: Subtheme;
}
