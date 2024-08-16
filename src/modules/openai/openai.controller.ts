import { Controller, Post, Body, UseInterceptors } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { Throttle } from "@nestjs/throttler";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@UseInterceptors(CacheInterceptor)
@Controller("openai")
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Throttle({
    default: {
      limit: 5,
      ttl: 5, // changeto 86400 (24 часа)
    },
  })
  @Post("interview/question")
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
      ttl: 5, // changetoа 86400 (24 часа)
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
