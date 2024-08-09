import { Injectable, Inject } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(@Inject("OPENAI_API_KEY") private readonly apiKey: string) {
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  async createInterviewQuestion(
    theme: string,
    subtheme: string,
    question: string,
  ): Promise<string> {
    const prompt = `You are an interviewer helping a candidate prepare for a technical interview. Ask the candidate the following question related to ${theme} - ${subtheme}:

    Question: ${question}

    Do not provide the answer. Wait for the candidate to respond.`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content.trim();
  }

  async evaluateAnswer(
    userAnswer: string,
    correctAnswer: string,
  ): Promise<string> {
    const prompt = `The candidate answered: "${userAnswer}". The correct answer is: "${correctAnswer}". Provide feedback to the candidate.`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content.trim();
  }
}
