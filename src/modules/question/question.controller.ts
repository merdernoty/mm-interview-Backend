import { Controller, Get, Post, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { Question } from './model/question.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new question' })
    @ApiResponse({ status: 201, description: 'The question has been successfully created.', type: Question })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async create(@Body() createQuestionInput: CreateQuestionInput): Promise<Question> {
        return this.questionService.create(createQuestionInput);
    }

    @Get()
    @ApiOperation({ summary: 'Get all questions' })
    @ApiResponse({ status: 200, description: 'Return all questions.', type: [Question] })
    async findAll(): Promise<Question[]> {
        return this.questionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a question by ID' })
    @ApiResponse({ status: 200, description: 'Return the question.', type: Question })
    @ApiResponse({ status: 404, description: 'Question not found.' })
    async findOne(@Param('id') id: string): Promise<Question> {
        const question = await this.questionService.findOne(+id);
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
        return question;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a question by ID' })
    @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Question not found.' })
    async remove(@Param('id') id: string): Promise<void> {
        const deleted = await this.questionService.remove(+id);
        if (!deleted) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
    }
}
