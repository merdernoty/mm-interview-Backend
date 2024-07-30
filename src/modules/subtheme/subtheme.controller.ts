import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from "@nestjs/common";
import { SubthemeService } from "./subtheme.service";
import { CreateSubthemeInput } from "./dto/create-subtheme.input";
import { Subtheme } from "./model/subtheme.model";

@Controller("subthemes")
export class SubthemeController {
  constructor(private readonly subthemeService: SubthemeService) {}

  @Post()
  async create(
    @Body() createSubthemeInput: CreateSubthemeInput,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    return await this.subthemeService.create(createSubthemeInput);
  }

  @Get()
  async findAll(): Promise<
    Subtheme[] | { status: HttpStatus; message: string }
  > {
    return await this.subthemeService.findAll();
  }

  @Put(":subthemeTitle")
  async update(
    @Param("title") title: string,
    @Body() updatedSubtheme: Partial<Subtheme>,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    return await this.subthemeService.update(title, updatedSubtheme);
  }

  @Delete(":id")
  async remove(
    @Param("title") title: string,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return await this.subthemeService.remove(title);
  }
}
