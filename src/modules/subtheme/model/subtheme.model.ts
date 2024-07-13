import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../../question/model/question.model";
import { Theme } from "../../theme/model/theme.model";

@Entity()
export class Subtheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: "Title" })
  title: string;
  @ManyToOne(() => Theme, (theme) => theme.subthemes)
  theme: Theme;
  @OneToMany(() => Question, (question) => question.subtheme)
  @ApiProperty({ description: "List of questions" })
  questions: Question[];
}
