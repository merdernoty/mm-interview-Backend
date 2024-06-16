import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateThemeInput {
    @Field()
    @ApiProperty({ description: "Title" })
    title: string;

    @Field()
    @ApiProperty({ description: "Description" })
    description: string;

    @Field(() => [Number])
    @ApiProperty({ description: "List of question IDs" })
    questionIds: number[];
}
