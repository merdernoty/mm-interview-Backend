import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({nullable : false})
  @ApiProperty({ description: "Question" })
  question: string;

  
  @Field()
  @Column({nullable : false})
  @ApiProperty({ description: "List of answers" })
  answers: string[];
}
