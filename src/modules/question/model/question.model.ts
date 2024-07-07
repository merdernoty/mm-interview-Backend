import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Theme } from "../../theme/model/theme.model";

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

  @ManyToOne(() => Theme, (theme) => theme.questions)
  theme: Theme;
}
