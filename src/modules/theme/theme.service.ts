import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Theme } from "./model/theme.model";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Logger } from "@nestjs/common";

@Injectable()
export class ThemeService {
  private readonly logger = new Logger(ThemeService.name);
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async create(
    dto: CreateThemeInput,
  ): Promise<{ status: number; message: string }> {
    try {
      const theme: Theme = this.themeRepository.create(dto);
      await this.themeRepository.save(theme);

      this.logger.log(`Created theme with title: ${dto.title}`);

      return {
        status: HttpStatus.CREATED,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to create theme: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      };
    }
  }

  async findOneById(
    id: number,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    try {
      const theme = await this.themeRepository.findOne({
        where: { id },
        relations: ["subthemes", "subthemes.questions"],
      });

      if (!theme) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      return theme;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findOneByTitle(
    title: string,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    try {
      const theme = await this.themeRepository.findOne({ where: { title } });
      if (!theme) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }
      return theme;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findAll(): Promise<Theme[] | { status: HttpStatus; message: string }> {
    try {
      return await this.themeRepository.find({ relations: ["subthemes"] });
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async update(
    id: number,
    dto: Partial<Theme>,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    try {
      const theme = await this.themeRepository.findOne({ where: { id } });

      if (!theme) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      Object.assign(theme, dto);
      await this.themeRepository.save(theme);

      return theme;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async remove(
    id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const theme: Theme = await this.themeRepository.findOne({
        where: { id },
      });
      if (!theme) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      await this.themeRepository.remove(theme);

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }
}
