import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { QuestionService } from "./question.service";
import { Question } from "./model/question.model";
import { CreateQuestionInput } from "./dto/create-question.input";
import { HttpStatus } from "@nestjs/common";

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question], { name: "questions" })
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: "question" })
  findOne(@Args("id", { type: () => Int }) id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  createQuestion(
    @Args("createQuestionInput") createQuestionInput: CreateQuestionInput,
  ): Promise<Question | { status: string; message: string }> {
    return this.questionService.create(createQuestionInput);
  }

  @Mutation(() => Question)
  removeQuestion(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return this.questionService.remove(id);
  }
}
