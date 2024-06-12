import { Injectable } from "@nestjs/common";
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

  async findOneByTitle(title: string): Promise<Theme | undefined> {
    return this.themeRepository.findOne({ where: { title } });
  }

  async findAll(): Promise<Theme[]> {
    return this.themeRepository.find();
  }

  async create(createThemeInput: CreateThemeInput): Promise<Theme> {
    const theme = this.themeRepository.create({
      ...createThemeInput,
    });
    return this.themeRepository.save(theme);
  }
}
