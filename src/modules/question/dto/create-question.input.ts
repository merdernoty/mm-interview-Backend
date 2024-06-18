import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateQuestionInput {
//todo добавить валидацию
    @Field()
    @ApiProperty({ description: "Question" })
    question: string;

    @Field(() => [String])
    @ApiProperty({ description: "List of answers" })
    answers: string[];

    @Field()
    @ApiProperty({ description: "Theme ID" })
    themeId: number;

}
