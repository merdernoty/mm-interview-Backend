import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateThemeInput {
  @ApiProperty({ description: "Title of the theme" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "Description of the theme" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: "Image of the theme", required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: "Related themes IDs",
    required: false,
    type: [Number],
  })
  @IsOptional()
  RelatedThemesIds?: number[];
}
