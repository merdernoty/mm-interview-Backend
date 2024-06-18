import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeInput } from './dto/create-theme.input';
import { Theme } from './model/theme.model';

@Controller('themes')
export class ThemeController {
    constructor(private readonly themeService: ThemeService) {}

    @Post()
    async create(@Body() createThemeInput: CreateThemeInput): Promise<Theme> {  //rename in dto
        return this.themeService.create(createThemeInput);  
    }

    @Get()
    async findAll(): Promise<Theme[]> {
        return this.themeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Theme> { //string
        return this.themeService.findOneById(+id); //number
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedTheme: Partial<Theme>): Promise<Theme> { //string
        return this.themeService.update(+id, updatedTheme);  //number
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> { // delete void and add response {status, message}
        await this.themeService.remove(+id);
    }
}
