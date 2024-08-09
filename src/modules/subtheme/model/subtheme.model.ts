import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { Question } from "../../question/model/question.model";
import { Theme } from "../../theme/model/theme.model";

@Entity()
export class Subtheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Theme, (theme) => theme.subthemes)
  theme: Theme;

  @OneToMany(() => Question, (question) => question.subtheme)
  questions: Question[];
}
