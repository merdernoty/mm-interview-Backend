import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./model/question.model";
import { CreateQuestionInput } from "./dto/create-question.input";
import { Subtheme } from "../subtheme/model/subtheme.model";
import { User } from "../user/model/user.model";
import { UserService } from "../user/user.service";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Subtheme)
    private readonly subthemeRepository: Repository<Subtheme>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(QuestionService.name);

  async findOneByQuestion(
    question: string,
  ): Promise<Question | { status: number; message: string }> {
    try {
      const result = await this.questionRepository.findOne({
        where: { question },
      });

      if (!result) {
        this.logger.warn(`Question '${question}' not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found question with text '${question}'`);

      return result;
    } catch (error) {
      const errorMessage = `Failed to find question '${question}': ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findAll(): Promise<Question[] | { status: number; message: string }> {
    try {
      const questions = await this.questionRepository.find();

      if (!questions || questions.length === 0) {
        this.logger.warn(`No questions found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found ${questions.length} questions`);

      return questions;
    } catch (error) {
      const errorMessage = `Failed to find questions: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findOneById(
    id: number,
  ): Promise<Question | { status: number; message: string }> {
    try {
      const result = await this.questionRepository.findOne({
        where: { id },
      });

      if (!result) {
        this.logger.warn(`Question with id ${id} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found question with id ${id}`);

      return result;
    } catch (error) {
      const errorMessage = `Failed to find question with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async create(
    dto: CreateQuestionInput,
  ): Promise<{ status: number; message: string }> {
    const { subthemeTitle, ...dtoFields } = dto;
    try {
      const subtheme = await this.subthemeRepository.findOne({
        where: { title: subthemeTitle },
      });

      if (!subtheme) {
        this.logger.warn(
          `Subtheme with subthemeTitle ${subthemeTitle} not found`,
        );
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      const newQuestion = this.questionRepository.create({
        ...dtoFields,
        subtheme,
      });

      await this.questionRepository.save(newQuestion);

      this.logger.log(
        `Created question with text '${newQuestion.question}' under subtheme: ${subtheme.title}`,
      );

      return {
        status: HttpStatus.CREATED,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to create question: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async remove(id: number): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await this.questionRepository.delete(id);

      if (result.affected === 0) {
        this.logger.warn(`Question with id ${id} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Deleted question with id ${id}`);

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to delete question with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async addQuestionToFavorite(
    userId: number,
    questionId: number,
  ): Promise<{ status: number; message: string }> {
    try {
      const user = await this.userRepository.findOneById(userId);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      const question = await this.questionRepository.findOneById(questionId);
      if (!question) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Question not found",
        };
      }

      if (!(question instanceof Question)) {
        throw new HttpException(
          "Invalid question object",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (
        user.info.favoriteQuestions.some((q: Question) => q.id === question.id)
      ) {
        return {
          status: HttpStatus.CONFLICT,
          message: "Question already in favorites",
        };
      }

      user.info.favoriteQuestions.push(question);
      await this.userRepository.save(user);

      return {
        status: HttpStatus.OK,
        message: "Question added to favorites",
      };
    } catch (error) {
      Logger.error(
        "Error adding question to favorites: ",
        error.message,
        error.stack,
      );
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Error adding question to favorites",
      };
    }
  }

  async removeQuestionFromFavorite(
    userId: number,
    questionId: number,
  ): Promise<{ status: number; message: string }> {
    try {
      // Находим пользователя по ID
      const user = await this.userRepository.findOneById(userId);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "User not found",
        };
      }

      // Находим вопрос по ID
      const question = await this.questionRepository.findOneById(questionId);
      if (!question) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Question not found",
        };
      }

      // Проверяем, что вопрос действительно существует
      if (!(question instanceof Question)) {
        throw new HttpException(
          "Invalid question object",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Находим индекс вопроса в избранных
      const questionIndex = user.info.favoriteQuestions.findIndex(
        (q: Question) => q.id === question.id,
      );

      if (questionIndex === -1) {
        return {
          status: HttpStatus.CONFLICT,
          message: "Question not in favorites",
        };
      }

      // Удаляем вопрос из избранных
      user.info.favoriteQuestions.splice(questionIndex, 1);
      await this.userRepository.save(user);

      return {
        status: HttpStatus.OK,
        message: "Question removed from favorites",
      };
    } catch (error) {
      Logger.error(
        "Error removing question from favorites: ",
        error.message,
        error.stack,
      );
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Error removing question from favorites",
      };
    }
  }
}
