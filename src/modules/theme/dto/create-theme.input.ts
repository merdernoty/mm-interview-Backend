import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from '@nestjs/swagger';
import { Question } from "../../question/model/question.model";

@InputType()
export class CreateThemeInput {
    @Field()
    @ApiProperty({ description: "Title" })
    title: string;
  
    @Field()
    @ApiProperty({ description: "Description" })
    description: string;
    
    @Field()
    @ApiProperty({ description: "List of questions" })
    questions: Question[];
}
