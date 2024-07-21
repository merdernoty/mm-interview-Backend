import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('interview/question')
  async generateQuestion(@Body() body: { theme: string; subtheme: string; question: string }) {
    const { theme, subtheme, question } = body;
    const interviewQuestion = await this.openaiService.createInterviewQuestion(theme, subtheme, question);
    return { question: interviewQuestion };
  }

  @Post('interview/answer')
  async evaluateAnswer(@Body() body: { userAnswer: string; correctAnswer: string }) {
    const { userAnswer, correctAnswer } = body;
    const evaluation = await this.openaiService.evaluateAnswer(userAnswer, correctAnswer);
    return { feedback: evaluation };
  }
}