import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import OpenAI from "openai";
import { ChatCompletionMessageDto } from "./dto/create-chat-completion.request";
import { ChatCompletionMessageParam } from "openai/resources";

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);

  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    try {
      const response = await this.openai.chat.completions.create({
        messages: messages as ChatCompletionMessageParam[],
        model: "gpt-3.5-turbo",
      });
      return response;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  private handleApiError(error: any): void {
    this.logger.error("Ошибка при запросе к OpenAI API", error);

    if (error.response) {
      const statusCode = error.response.status;
      const message = error.response.data?.error?.message || "Неизвестная ошибка";

      if (statusCode === 429) {
        throw new HttpException(
          "Вы превысили квоту. Пожалуйста, проверьте свой план и детали оплаты.",
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else if (statusCode >= 500) {
        throw new HttpException(
          `Произошла ошибка на сервере OpenAI. Пожалуйста, повторите попытку позже. Статус ошибки: ${statusCode}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          `Ошибка при запросе к OpenAI API. Статус ошибки: ${statusCode}, Сообщение: ${message}`,
          statusCode,
        );
      }
    } else {
      throw new HttpException(
        "Произошла ошибка при запросе к OpenAI API. Пожалуйста, повторите попытку позже.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
