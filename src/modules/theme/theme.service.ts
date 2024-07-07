import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Theme } from "./model/theme.model";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Logger } from "@nestjs/common";

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}
  private readonly logger = new Logger(ThemeService.name);

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
        message: "error",
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
        this.logger.warn(`Theme with id ${id} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found theme with id ${id}`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to find theme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

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
      const theme = await this.themeRepository.findOne({
        where: { title },
        relations: ["subthemes", "subthemes.questions"],
      });

      if (!theme) {
        this.logger.warn(`Theme with title '${title}' not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found theme with title '${title}'`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to find theme with title '${title}': ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findAll(): Promise<Theme[] | { status: HttpStatus; message: string }> {
    try {
      const themes = await this.themeRepository.find({
        relations: ["subthemes"],
      });

      if (!themes || themes.length === 0) {
        this.logger.warn(`No themes found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found ${themes.length} themes`);

      return themes;
    } catch (error) {
      const errorMessage = `Failed to find themes: ${error.message}`;
      this.logger.error(errorMessage);

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
        this.logger.warn(`Theme with id ${id} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      Object.assign(theme, dto);
      await this.themeRepository.save(theme);

      this.logger.log(`Updated theme with id ${id}`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to update theme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

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
        this.logger.warn(`Theme with id ${id} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      await this.themeRepository.remove(theme);

      this.logger.log(`Deleted theme with id ${id}`);

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to delete theme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }
}
