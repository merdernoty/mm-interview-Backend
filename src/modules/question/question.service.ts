import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./model/question.model";
import { CreateQuestionInput } from "./dto/create-question.input";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}



  async findOneByQuestion(question: string): Promise<Question | undefined> {
    return this.questionRepository.findOne({ where: { question } });
  }



  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }



  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    
    const question = this.questionRepository.create({
      ...createQuestionInput,
    });
    return this.questionRepository.save(question);
  }
}
