import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateThemeInput {
//todo добавить валидацию
    @Field()
    @ApiProperty({ description: "Title of the theme" })
    title: string;

    @Field()
    @ApiProperty({ description: "Description of the theme" })
    description: string;
}
