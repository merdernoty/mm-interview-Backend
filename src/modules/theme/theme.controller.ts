import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { ThemeService } from "./theme.service";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Theme } from "./model/theme.model";

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
  async findAll(): Promise<Theme[] | { status: HttpStatus; message: string }> {
    return await this.themeService.findAll();
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

  @Delete(":id")
  async remove(
    @Param("id") id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return await this.themeService.remove(id);
  }
}
