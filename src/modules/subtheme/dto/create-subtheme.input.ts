import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreateSubthemeInput {
  //todo добавить валидацию
  @Field()
  @ApiProperty({ description: "Title of the theme" })
  title: string;

  @Field()
  @ApiProperty({ description: "Theme ID" })
  themeTitle: string;
}
