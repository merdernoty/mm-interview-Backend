import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateThemeInput {
  @Field()
  @ApiProperty({ description: "Title of the theme" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @ApiProperty({ description: "Description of the theme" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @ApiProperty({ description: "Award name" })
  @IsNotEmpty()
  @IsString()
  award: string;
}
