import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Theme } from "./model/Theme.model";
import { CreateThemeInput } from "./dto/create-theme.input";

@Injectable()
export class ThemeService {
  constructor(
      @InjectRepository(Theme)
      private readonly themeRepository: Repository<Theme>
  ) {}

  async findOneById(id: number): Promise<Theme | undefined> {
    return this.themeRepository.findOne({ where: { id } });
  }

  async findOneByTitle(title: string): Promise<Theme | undefined> {
    return this.themeRepository.findOne({ where: { title } });
  }

  async findAll(): Promise<Theme[]> {
    return this.themeRepository.find();
  }

  async create(createThemeInput: CreateThemeInput): Promise<Theme> {
    const theme = this.themeRepository.create(createThemeInput);
    return this.themeRepository.save(theme);
  }

  async update(id: number, updateThemeInput: Partial<Theme>): Promise<Theme> {
    const theme = await this.themeRepository.findOne({ where: { id } });
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);
    }

    Object.assign(theme, updateThemeInput);
    return this.themeRepository.save(theme);
  }

  async remove(id: number): Promise<void> {
    const theme = await this.themeRepository.findOne({ where: { id } });
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);
    }

    await this.themeRepository.remove(theme);
  }
}
