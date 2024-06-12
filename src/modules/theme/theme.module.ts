import { TypeOrmModule } from "@nestjs/typeorm";
import { ThemeController } from "./theme.controller";

import { Module } from "@nestjs/common";
import { Theme } from "./model/theme.model";
import { ThemeService } from "./theme.service";
//import { ThemeResolver } from "./question.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Theme])],
    controllers: [ThemeController],
    providers: [ThemeService],
    exports: [ThemeService],
  })
  export class QuestionModule {}
