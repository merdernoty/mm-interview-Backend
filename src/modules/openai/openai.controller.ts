import { Controller, Post, Body } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { Throttle } from "@nestjs/throttler";

@Controller("openai")
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post("interview/question")
  @Throttle({
    default: {
      limit: 5,
      ttl: 5,//change on 86400
    },
  })
  async generateQuestion(
    @Body() body: { theme: string; subtheme: string; question: string }
  ) {
    const { theme, subtheme, question } = body;
    const interviewQuestion = await this.openaiService.createInterviewQuestion(
      theme,
      subtheme,
      question
    );
    return { question: interviewQuestion };
  }

  @Throttle({
    default: {
      limit: 5,
      ttl: 5,//change on 86400
    },
  })
  @Post("interview/answer")
  async evaluateAnswer(
    @Body() body: { userAnswer: string; correctAnswer: string }
  ) {
    const { userAnswer, correctAnswer } = body;
    const evaluation = await this.openaiService.evaluateAnswer(
      userAnswer,
      correctAnswer
    );
    return { feedback: evaluation };
  }
}
