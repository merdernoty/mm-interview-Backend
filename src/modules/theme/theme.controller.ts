import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeInput } from './dto/create-theme.input';
import { Theme } from './model/theme.model';

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
    async findOne(@Param('id') id: string): Promise<Theme> {
        return this.themeService.findOneById(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedTheme: Partial<Theme>): Promise<Theme> {
        return this.themeService.update(+id, updatedTheme);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.themeService.remove(+id);
    }
}
