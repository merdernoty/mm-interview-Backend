import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionInput } from "./dto/create-question.input";
import { Question } from "./model/question.model";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("questions")
@Controller("questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: "Create a new question" })
  @ApiResponse({
    status: 201,
    description: "The question has been successfully created.",
    type: Question,
  })
  @ApiResponse({ status: 400, description: "Invalid input." })
  async create(
    @Body() createQuestionInput: CreateQuestionInput,
  ): Promise<{ status: number; message: string }> {
    return this.questionService.create(createQuestionInput);
  }

  @Get()
  @ApiOperation({ summary: "Get all questions" })
  @ApiResponse({
    status: 200,
    description: "Return all questions.",
    type: [Question],
  })
  async findAll(): Promise<{ status: number; message: string } | Question[]> {
    return await this.questionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a question by ID" })
  @ApiResponse({
    status: 200,
    description: "Return the question.",
    type: Question,
  })
  @ApiResponse({ status: 404, description: "Question not found." })
  async findOne(
    @Param("id") id: number,
  ): Promise<Question | { status: number; message: string }> {
    return await this.questionService.findOne(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a question by ID" })
  @ApiResponse({
    status: 200,
    description: "The question has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Question not found." })
  async remove(
    @Param("id") id: number,
  ): Promise<{ statusCode: number; message: string }> {
    return this.questionService.remove(id);
  }
}
