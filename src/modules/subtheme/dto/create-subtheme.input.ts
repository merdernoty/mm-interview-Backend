import { ApiProperty } from "@nestjs/swagger";

export class CreateSubthemeInput {
  //todo добавить валидацию

  @ApiProperty({ description: "Title of the theme" })
  title: string;

  @ApiProperty({ description: "Theme ID" })
  themeId: number;
}
