import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubthemeService } from "./subtheme.service";
import { SubthemeController } from "./subtheme.controller";
import { Subtheme } from "./model/subtheme.model";
import { Theme } from "../theme/model/theme.model";
import { ThemeModule } from "../theme/theme.module";

@Module({
  imports: [TypeOrmModule.forFeature([Subtheme, Theme]), ThemeModule],
  providers: [SubthemeService],
  controllers: [SubthemeController],
  exports: [TypeOrmModule],
})
export class SubthemeModule {}
