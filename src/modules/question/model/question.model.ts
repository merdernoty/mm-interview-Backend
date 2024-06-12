import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Theme } from '../../theme/model/theme.model';

@ObjectType()
@Entity()
export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({nullable: false})
  @ApiProperty({ description: "Question" })
  question: string;

  @Field(() => [String])
  @Column("simple-array", { nullable: false })
  @ApiProperty({ description: "List of answers" })
  answers: string[];

  @Field(() => Theme)
  @ManyToOne(() => Theme, theme => theme.questions)
  theme: Theme;
}
