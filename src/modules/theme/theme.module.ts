import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThemeService } from "./theme.service";
import { ThemeController } from "./theme.controller";
import { Theme } from "./model/theme.model";
import { ThemeResolver } from "./theme.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemeService, ThemeResolver],
  controllers: [ThemeController],
  exports: [TypeOrmModule.forFeature([Theme])],
})
export class ThemeModule {}
