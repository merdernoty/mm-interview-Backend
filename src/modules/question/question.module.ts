import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './model/question.model';
import { ThemeModule } from '../theme/theme.module';
import {QraphqlModule} from "../../graphql/qraphql.module";
import {QuestionResolver} from "./question.resolver"; // Импортируем ThemeModule с forwardRef()

@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        forwardRef(() => ThemeModule),
        QraphqlModule,// Используем forwardRef() для ThemeModule
    ],
    providers: [
        QuestionService,
        QuestionResolver,
    ],
    controllers: [
        QuestionController,
    ],
    exports: [
        QuestionService,
    ],
})
export class QuestionModule {}
