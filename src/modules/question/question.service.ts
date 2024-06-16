import { Injectable, NotFoundException } from "@nestjs/common";
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
      @InjectRepository(Theme) // Инжектим репозиторий темы
      private readonly themeRepository: Repository<Theme>
  ) {}

  async findOneByQuestion(question: string): Promise<Question | undefined> {
    return this.questionRepository.findOne({ where: { question } });
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question | undefined> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    // Находим тему по themeId
    const theme = await this.themeRepository.findOne({ where: { id: createQuestionInput.themeId } });

    if (!theme) {
      throw new NotFoundException(`Theme with ID ${createQuestionInput.themeId} not found`);
    }

    // Создаем вопрос и сохраняем его
    const question = this.questionRepository.create({
      question: createQuestionInput.question,
      answers: createQuestionInput.answers,
      theme: theme,
    });
    return this.questionRepository.save(question);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return true;
  }
}
