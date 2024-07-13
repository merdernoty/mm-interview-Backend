import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThemeController } from "./theme.controller";
import { ThemeService } from "./theme.service";
import { Theme } from "./model/theme.model";

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemeService],
  controllers: [ThemeController],
  exports: [TypeOrmModule.forFeature([Theme])],
})
export class ThemeModule {}
