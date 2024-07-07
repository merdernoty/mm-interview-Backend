import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./model/question.model";
import { CreateQuestionInput } from "./dto/create-question.input";
import { Theme } from "../theme/model/theme.model";
import { Subtheme } from "../subtheme/model/subtheme.model";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Subtheme)
    private readonly subthemeRepository: Repository<Subtheme>,
  ) {}

  async findOneByQuestion(
    question: string,
  ): Promise<Question | { status: number; message: string }> {
    try {
      const result = await this.questionRepository.findOne({
        where: { question },
      });

      if (!result) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findAll(): Promise<Question[] | { status: number; message: string }> {
    try {
      return this.questionRepository.find();
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findOne(
    id: number,
  ): Promise<Question | { status: number; message: string }> {
    try {
      const result = await this.questionRepository.findOne({
        where: { id },
      });

      if (!result) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async create(
    dto: CreateQuestionInput,
  ): Promise<{ status: number; message: string }> {
    const { subthemeId, ...dtoFields } = dto;
    try {
      const subtheme = await this.subthemeRepository.findOne({
        where: { id: subthemeId },
      });

      if (!subtheme) {
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

      return {
        status: HttpStatus.CREATED,
        message: "successful",
      };
    } catch (error) {
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
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }
}
