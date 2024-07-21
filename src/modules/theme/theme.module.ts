import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThemeController } from "./theme.controller";
import { ThemeService } from "./theme.service";
import { Theme } from "./model/theme.model";
import { ThemeResolver } from "./graphQL/theme.resolver";
import { GraphqlModule } from "../../graphQL/Graphql.module";

@Module({
  imports: [TypeOrmModule.forFeature([Theme]), GraphqlModule],
  providers: [ThemeService, ThemeResolver],
  controllers: [ThemeController],
  exports: [TypeOrmModule.forFeature([Theme])],
})
export class ThemeModule {}
