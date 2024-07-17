import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
  UseGuards,
  Request,
  Logger,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionInput } from "./dto/create-question.input";
import { Question } from "./model/question.model";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guard/jwtAuth.guard";

@ApiTags("questions")
@Controller("questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  private readonly logger = new Logger(QuestionController.name);

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
  async findOneByid(
    @Param("id") id: number,
  ): Promise<Question | { status: number; message: string }> {
    return await this.questionService.findOneById(id);
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

  @UseGuards(JwtAuthGuard)
  @Post("/addToFav/:questionId")
  async addQuestionToFav(@Request() req, @Param("questionId") questionId) {
    this.logger.log(`fav from question ${questionId}`);
    const Userid = req.user.id;
    this.logger.log(`fav from user${Userid}`);
    return this.questionService.addQuestionToFavorite(Userid, questionId);
  }
}
