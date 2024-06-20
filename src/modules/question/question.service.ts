import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./model/question.model";
import { CreateQuestionInput } from "./dto/create-question.input";
import { Theme } from "../theme/model/theme.model";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async findOneByQuestion(question: string): Promise<Question> {
    return this.questionRepository.findOne({ where: { question } });
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async create(
    dto: CreateQuestionInput,
  ): Promise<Question | { status: string; message: string }> {
    const { themeId, ...dtoFields } = dto;

    const theme = await this.themeRepository.findOne({
      where: { id: themeId },
    });

    if (!theme) {
      return {
        status: "error",
        message: `Theme with id ${themeId} not found`,
      };
    }

    const newQuestion = this.questionRepository.create({
      ...dtoFields,
      theme,
    });

    return await this.questionRepository.save(newQuestion);
  }

  async remove(
    id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return {
      statusCode: HttpStatus.OK,
      message: "successful",
    };
  }
}
