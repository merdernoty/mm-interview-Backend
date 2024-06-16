import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './model/question.model';
import { ThemeModule } from '../theme/theme.module'; // Импортируем ThemeModule с forwardRef()

@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        forwardRef(() => ThemeModule), // Используем forwardRef() для ThemeModule
    ],
    providers: [
        QuestionService,
    ],
    controllers: [
        QuestionController,
    ],
    exports: [
        QuestionService,
    ],
})
export class QuestionModule {}
