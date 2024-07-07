import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { Question } from "./model/question.model";
import { Subtheme } from "../subtheme/model/subtheme.model";
import { SubthemeModule } from "../subtheme/subtheme.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Subtheme]),
    forwardRef(() => SubthemeModule),
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
