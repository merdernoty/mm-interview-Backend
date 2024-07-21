import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { QuestionService } from "./question.service";

import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Question } from "./model/question.model";

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => Question, { name: "getQuestionById" })
  async findOneById(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<Question> {
    const result = await this.questionService.findOneById(id);

    if ("status" in result) {
      if (result.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(result.message);
      } else {
        throw new Error(result.message);
      }
    }

    return result;
  }
}
