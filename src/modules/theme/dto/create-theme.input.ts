import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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

  @Field({ nullable: true })
  @ApiProperty({ description: "Image of the theme", required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @Field((type) => [Number], { nullable: true })
  @ApiProperty({
    description: "Related themes IDs",
    required: false,
    type: [Number],
  })
  @IsOptional()
  RelatedThemesIds?: number[];
}
