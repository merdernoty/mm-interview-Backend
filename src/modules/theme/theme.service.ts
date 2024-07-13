import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Theme } from "./model/theme.model";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Logger } from "@nestjs/common";
import { Award } from "./interface/Award";
// import { RelatedTheme } from "./interface/RelatedTheme"

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

      if (dto.RelatedThemesIds && dto.RelatedThemesIds.length > 0) {
        const relatedThemesEntities = await this.themeRepository.findByIds(
          dto.RelatedThemesIds,
        );
        const relatedThemes: RelatedTheme[] = relatedThemesEntities.map(
          (entity) => ({
            id: entity.id,
            title: entity.title,
          }),
        );
        theme.relatedThemes = relatedThemes;
      }

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

  async findAll(
    depth?: number,
  ): Promise<Theme[] | { status: HttpStatus; message: string }> {
    try {
      const relations = depth && depth > 1 ? ["subthemes"] : [];
      const themes = await this.themeRepository.find({
        relations: relations,
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
  async addAwardToTheme(
    themeId: number,
    award: Award,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const theme: Theme = await this.themeRepository.findOne({
        where: { id: themeId },
      });

      if (!theme) {
        this.logger.warn(`Theme with id ${themeId} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      theme.award = award;

      await this.themeRepository.save(theme);

      this.logger.log(`Award successfully added to theme with id ${themeId}`);

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      this.logger.error(
        `Error adding award to theme with id ${themeId}`,
        error,
      );

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async addRelatedToThemes(
    themeId: number,
    relatedThemesIds: number[],
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const theme: Theme = await this.themeRepository.findOne({
        where: { id: themeId },
      });

      if (!theme) {
        this.logger.warn(`Theme with id ${themeId} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Theme not found",
        };
      }

      if (!Array.isArray(relatedThemesIds) || relatedThemesIds.length === 0) {
        this.logger.warn(
          `No related themes ids provided or invalid format: ${relatedThemesIds.join(", ")}`,
        );
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "No related themes ids provided or invalid format",
        };
      }

      // Fetch all related themes
      const relatedThemes =
        await this.themeRepository.findByIds(relatedThemesIds);

      if (relatedThemes.length !== relatedThemesIds.length) {
        this.logger.warn(
          `One or more related themes not found: ${relatedThemesIds.join(", ")}`,
        );
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "One or more related themes not found",
        };
      }

      // Обновляем связанные темы основной темы
      theme.relatedThemes = relatedThemes;

      // Сохраняем изменения в базе данных
      await this.themeRepository.save(theme);

      return {
        statusCode: HttpStatus.OK,
        message: "Related themes updated successfully",
      };
    } catch (error) {
      this.logger.error(
        `Error updating related themes for theme with id ${themeId}`,
        error.stack,
      );
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
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
