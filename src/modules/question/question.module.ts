import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionController } from "./question.controller";

import { Module } from "@nestjs/common";
import { Question } from "./model/question.model";
import { QuestionService } from "./question.service";
//import { QuestionResolver } from "./question.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    controllers: [QuestionController],
    providers: [QuestionService,],
    exports: [QuestionService],
  })
  export class QuestionModule {}
