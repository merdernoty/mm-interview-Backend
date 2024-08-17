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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ThemeService } from "./theme.service";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Theme } from "./model/theme.model";
import { Award } from "./interface/Award";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { FileInterceptor } from "@nestjs/platform-express";

@UseInterceptors(CacheInterceptor)
@Controller("themes")
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  @CacheTTL(60)
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @Body() createThemeInput: CreateThemeInput,
    @UploadedFile() imageUrl: any
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.create(createThemeInput, imageUrl);
  }

  @CacheTTL(60)
  @Get()
  async findAll(): Promise<Theme[] | { status: HttpStatus; message: string }> {
    return await this.themeService.findAll();
  }

  @CacheTTL(60)
  @Get(":title")
  async findOneByTitle(
    @Param("title") title: string
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.findOneByTitle(title);
  }

  @CacheTTL(60)
  @Get("id/:id")
  async findOneById(
    @Param("id") id: number
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.findOneById(id);
  }
  @Put(":id")
  async update(
    @Param("title") title: string,
    @Body() updatedTheme: Partial<Theme>
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    return await this.themeService.update(title, updatedTheme);
  }
  @Post(":themeId/award")
  async addAwardToTheme(
    @Param("title") title: string,
    @Body() award: Award
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return this.themeService.addAwardToTheme(title, award);
  }

  @Put("/:themeId/related")
  async addRelatedToThemes(
    @Param("title") title: string,
    @Body("relatedThemesIds") relatedThemesIds: number[]
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return this.themeService.addRelatedToThemes(title, relatedThemesIds);
  }

  @Delete(":id")
  async remove(
    @Param("id") id: number
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return await this.themeService.remove(id);
  }
}
