import { ApiProperty } from "@nestjs/swagger";
import { Difficulty } from "../enum/difficulty.enum";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty } from "class-validator";

export class CreateQuestionInput {
  @ApiProperty({ description: "Question" })
  @IsNotEmpty({ message: "Question should not be empty" })
  question: string;

  @ApiProperty({ description: "List of answers" })
  @IsArray({ message: "Answers should be an array" })
  answers: string[];

  @ApiProperty({ description: "Subtheme title" })
  @IsNotEmpty({ message: "Subtheme title should not be empty" })
  subthemeId: number;

  @ApiProperty({ description: "Difficulty level", enum: Difficulty })
  @IsEnum(Difficulty, {
    message: "Difficulty must be one of: EASY, MEDIUM, HARD",
  })
  difficulty: Difficulty;
}
