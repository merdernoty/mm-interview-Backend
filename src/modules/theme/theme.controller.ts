import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { ThemeService } from "./theme.service";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Theme } from "./model/theme.model";
import { Award } from "./interface/Award";

@Controller("themes")
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  async create(
    @Body() createThemeInput: CreateThemeInput,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.create(createThemeInput);
  }

  @Get()
  async findAll(
    @Query("depth") depth: number,
  ): Promise<Theme[] | { status: HttpStatus; message: string }> {
    return await this.themeService.findAll(depth);
  }

  @Get("byId/:id")
  async findOneById(
    @Param("id") id: number,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.findOneById(id);
  }

  @Get(":title")
  async findOneByTitle(
    @Param("title") title: string,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.findOneByTitle(title);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updatedTheme: Partial<Theme>,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.update(id, updatedTheme);
  }
  @Post(":themeId/award")
  async addAwardToTheme(
    @Param("themeId") themeId: number,
    @Body() award: Award,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return this.themeService.addAwardToTheme(themeId, award);
  }

  @Put("/:themeId/related")
  async addRelatedToThemes(
    @Param("themeId") themeId: number,
    @Body("relatedThemesIds") relatedThemesIds: number[],
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return this.themeService.addRelatedToThemes(themeId, relatedThemesIds);
  }

  @Delete(":id")
  async remove(
    @Param("id") id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return await this.themeService.remove(id);
  }
}
