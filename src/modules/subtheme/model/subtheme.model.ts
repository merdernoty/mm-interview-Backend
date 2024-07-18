import { Entity, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "../../question/model/question.model";
import { Theme } from "../../theme/model/theme.model";

@Entity()
export class Subtheme {
  @PrimaryColumn()
  @ApiProperty({ description: "Title" })
  title: string;

  @ManyToOne(() => Theme, (theme) => theme.subthemes)
  theme: Theme;
  @OneToMany(() => Question, (question) => question.subtheme)
  @ApiProperty({ description: "List of questions" })
  questions: Question[];
}
