import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../../question/model/question.model";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: "Title" })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ description: "Description" })
  description: string;

  @OneToMany(() => Question, (question) => question.theme)
  @ApiProperty({ description: "List of questions" })
  questions: Question[];
}
