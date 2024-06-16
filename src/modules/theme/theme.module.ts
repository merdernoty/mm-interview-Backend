import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { Theme } from './model/theme.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Theme]),
    ],
    providers: [
        ThemeService,
    ],
    controllers: [
        ThemeController,
    ],
    exports: [
        TypeOrmModule.forFeature([Theme]), // Экспортируем TypeOrmModule с фичами темы
    ],
})
export class ThemeModule {}
