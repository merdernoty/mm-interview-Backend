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
        this.logger.warn(`Theme with id ${id} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Theme not found",
        };
      }

      this.logger.log(`Found theme with id ${id}`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to find theme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      };
    }
  }

  async findOneByTitle(
    title: string,
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    try {
      const theme = await this.themeRepository.findOne({ where: { title } });

      if (!theme) {
        this.logger.warn(`Theme with title '${title}' not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Theme not found",
        };
      }

      this.logger.log(`Found theme with title '${title}'`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to find theme with title '${title}': ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
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
          message: "No themes found",
        };
      }

      this.logger.log(`Found ${themes.length} themes`);

      return themes;
    } catch (error) {
      const errorMessage = `Failed to find themes: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
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
          message: "Theme not found",
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
        message: "Internal server error",
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
          message: "Theme not found",
        };
      }

      await this.themeRepository.remove(theme);

      this.logger.log(`Deleted theme with id ${id}`);

      return {
        statusCode: HttpStatus.OK,
        message: "Successfully deleted",
      };
    } catch (error) {
      const errorMessage = `Failed to delete theme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      };
    }
  }
}
