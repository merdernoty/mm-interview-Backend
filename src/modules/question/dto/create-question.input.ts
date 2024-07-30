import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Difficulty } from "../enum/difficulty.enum";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty } from "class-validator";

@InputType()
export class CreateQuestionInput {
  @Field()
  @ApiProperty({ description: "Question" })
  @IsNotEmpty({ message: "Question should not be empty" })
  question: string;

  @Field(() => [String])
  @ApiProperty({ description: "List of answers" })
  @IsArray({ message: "Answers should be an array" })
  answers: string[];

  @Field()
  @ApiProperty({ description: "Subtheme title" })
  @IsNotEmpty({ message: "Subtheme title should not be empty" })
  subthemeTitle: string;

  @Field(() => Difficulty)
  @ApiProperty({ description: "Difficulty level", enum: Difficulty })
  @IsEnum(Difficulty, {
    message: "Difficulty must be one of: EASY, MEDIUM, HARD",
  })
  difficulty: Difficulty;
}
