import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Theme } from "./model/theme.model";
import { CreateThemeInput } from "./dto/create-theme.input";
import { Logger } from "@nestjs/common";
import { Award } from "./interface/Award";
import { StatusMessage } from "./model/status-message.model";
import { UploadService } from "../upload/upload.service";
//import { RelatedTheme } from "./interface/RelatedTheme"

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
    private readonly uploadRepository: UploadService
  ) {}
  private readonly logger = new Logger(ThemeService.name);

  async create(
    dto: CreateThemeInput,
    imageUrl: any
  ): Promise<{ status: number; message: string }> {
    try {
      const theme: Theme = this.themeRepository.create(dto);

      if (imageUrl) {
        const uploadedImageUrl =
          await this.uploadRepository.uploadFile(imageUrl);
        theme.image = uploadedImageUrl;
      }
      if (dto.RelatedThemesIds && dto.RelatedThemesIds.length > 0) {
        const relatedThemesEntities = await this.themeRepository.findByIds(
          dto.RelatedThemesIds
        );
        const relatedThemes: RelatedTheme[] = relatedThemesEntities.map(
          (entity) => ({
            title: entity.title,
            image: "default image",
          })
        );
        theme.relatedThemes = relatedThemes;
      }
      await this.themeRepository.save(theme);

      this.logger.log(`Created theme with title: ${dto.title}`);

      return {
        status: HttpStatus.CREATED,
        message: "Theme created successfully",
      };
    } catch (error) {
      const errorMessage = `Failed to create theme: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      };
    }
  }

  async findOneById(
    id: number
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    try {
      const theme = await this.themeRepository.findOne({
        where: { id },
        relations: ["subthemes", "subthemes.questions"],
      });

      if (!theme) {
        this.logger.warn(`Theme with ID '${id}' not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Theme not found",
        };
      }

      this.logger.log(`Found theme with ID '${id}'`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to find theme with ID '${id}': ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Error finding theme",
      };
    }
  }

  async findOneByTitle(
    title: string
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

  async findAll(): Promise<Theme[] | StatusMessage> {
    try {
      const themes = await this.themeRepository.find({
        relations: ["subthemes", "subthemes.questions"],
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
    themeTitle: string,
    dto: Partial<Theme>
  ): Promise<Theme | { status: HttpStatus; message: string }> {
    try {
      const theme = await this.themeRepository.findOne({
        where: { title: themeTitle },
      });

      if (!theme) {
        this.logger.warn(`Theme with id ${themeTitle} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      Object.assign(theme, dto);
      await this.themeRepository.save(theme);

      this.logger.log(`Updated theme with id ${themeTitle}`);

      return theme;
    } catch (error) {
      const errorMessage = `Failed to update theme with id ${themeTitle}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }
  async addAwardToTheme(
    themeTitle: string,
    award: Award
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const theme: Theme = await this.themeRepository.findOne({
        where: { title: themeTitle },
      });

      if (!theme) {
        this.logger.warn(`Theme with Title ${themeTitle} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      theme.award = award;

      await this.themeRepository.save(theme);

      this.logger.log(
        `Award successfully added to theme with Title ${themeTitle}`
      );

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      this.logger.error(
        `Error adding award to theme with Title ${themeTitle}`,
        error
      );

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async addRelatedToThemes(
    themeTitle: string,
    relatedThemesIds: number[]
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const theme: Theme = await this.themeRepository.findOne({
        where: { title: themeTitle },
      });

      if (!theme) {
        this.logger.warn(`Theme with Title ${themeTitle} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Theme not found",
        };
      }

      if (!Array.isArray(relatedThemesIds) || relatedThemesIds.length === 0) {
        this.logger.warn(
          `No related themes ids provided or invalid format: ${relatedThemesIds.join(", ")}`
        );
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "No related themes ids provided or invalid format",
        };
      }

      const relatedThemes =
        await this.themeRepository.findByIds(relatedThemesIds);

      if (relatedThemes.length !== relatedThemesIds.length) {
        this.logger.warn(
          `One or more related themes not found: ${relatedThemesIds.join(", ")}`
        );
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "One or more related themes not found",
        };
      }

      theme.relatedThemes = relatedThemes;

      await this.themeRepository.save(theme);

      return {
        statusCode: HttpStatus.OK,
        message: "Related themes updated successfully",
      };
    } catch (error) {
      this.logger.error(
        `Error updating related themes for theme with Title ${themeTitle}`,
        error.stack
      );
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      };
    }
  }

  async remove(
    id: number
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const theme: Theme = await this.themeRepository.findOne({
        where: { id: id },
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
