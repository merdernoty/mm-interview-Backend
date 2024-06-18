import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThemeService } from "./theme.service";
import { ThemeController } from "./theme.controller";
import { Theme } from "./model/theme.model";
import { QraphqlModule } from "../../graphql/qraphql.module";
import { QuestionResolver } from "../question/question.resolver";
import { ThemeResolver } from "./theme.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Theme]), QraphqlModule],
  providers: [ThemeService, ThemeResolver],
  controllers: [ThemeController],
  exports: [
    TypeOrmModule.forFeature([Theme]), // Экспортируем TypeOrmModule с фичами темы
  ],
})
export class ThemeModule {}
