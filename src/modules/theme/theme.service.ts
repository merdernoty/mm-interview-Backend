import {HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Theme } from "./model/theme.model"; // Исправляем путь
import { CreateThemeInput } from "./dto/create-theme.input";

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async findOneById(id: number): Promise<Theme | undefined> {  //delete undefined
    const theme = await this.themeRepository.findOne({ where: { id } });
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);  //delete error
    }
    return theme;
  }

  async findOneByTitle(title: string): Promise<Theme | undefined> {
    return this.themeRepository.findOne({ where: { title } });
  }

  async findAll(): Promise<Theme[]> {
    return this.themeRepository.find({ relations: ['questions'] });
  }

  async create(dto: CreateThemeInput): Promise<Theme> {
    const theme = this.themeRepository.create(dto);   // rename in dto
    return this.themeRepository.save(theme);
  }

  async update(id: number, dto: Partial<Theme>): Promise<Theme> {
    const theme = await this.themeRepository.findOne({ where: { id } });
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);
    }

    Object.assign(theme, dto);
    return this.themeRepository.save(theme);
  }

  async remove(id: number): Promise<{ status: HttpStatus; message: string }> {
    const theme = await this.themeRepository.findOne({ where: { id } });
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);
    }

    await this.themeRepository.remove(theme);

    return {
      status: HttpStatus.OK,
      message: `successful`
    };
  }

}
