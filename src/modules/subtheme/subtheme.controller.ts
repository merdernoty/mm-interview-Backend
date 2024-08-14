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
  @Get(":id")
  async findOneById(
    @Param("id") id: number,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    return await this.subthemeService.findOneById(id);
  }
  @Put(":subthemeTitle")
  async update(
    @Param("title") id: number,
    @Body() updatedSubtheme: Partial<Subtheme>,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    return await this.subthemeService.update(id, updatedSubtheme);
  }

  @Delete(":id")
  async remove(
    @Param("title") id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    return await this.subthemeService.remove(id);
  }
}
