import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateQuestionInput {
    @Field()
    @ApiProperty({ description: "Question" })
    question: string;
  
    
    @Field()
    @ApiProperty({ description: "List of answers" })
    answers: string[];
}
