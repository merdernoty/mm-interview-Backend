import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class Theme {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({nullable : false})
  @ApiProperty({ description: "Question" })
  title: string;

  @Field()
  @Column({nullable : false})
  @ApiProperty({ description: "Question" })
  description: string;

  @Field()
  @Column({nullable : false})
  @ApiProperty({ description: "Question" })
  questions: string[];

  
}
