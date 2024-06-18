import {Controller, Get, Post, Body, Param, Delete, Put, HttpStatus} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeInput } from './dto/create-theme.input';
import { Theme } from './model/theme.model';
import * as http from "node:http";

@Controller('themes')
export class ThemeController {
    constructor(private readonly themeService: ThemeService) {}

    @Post()
    async create(@Body() createThemeInput: CreateThemeInput): Promise<Theme> {
        return this.themeService.create(createThemeInput);
    }

    @Get()
    async findAll(): Promise<Theme[]> {
        return this.themeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Theme> {
        return this.themeService.findOneById(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updatedTheme: Partial<Theme>): Promise<Theme> {
        return this.themeService.update(id, updatedTheme);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ status: HttpStatus, message: string }> {
        return await this.themeService.remove(id);
    }

}
