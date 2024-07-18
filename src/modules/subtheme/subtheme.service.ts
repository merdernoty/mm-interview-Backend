import { HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Subtheme } from "./model/subtheme.model";
import { CreateSubthemeInput } from "./dto/create-subtheme.input";
import { Theme } from "../theme/model/theme.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@nestjs/common";

@Injectable()
export class SubthemeService {
  constructor(
    @InjectRepository(Subtheme)
    private readonly subthemeRepository: Repository<Subtheme>,

    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}
  private readonly logger = new Logger(SubthemeService.name);

  async findOneByTitle(
    title: string,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    try {
      const subtheme = await this.subthemeRepository.findOne({
        where: { title },
        relations: ["questions"],
      });
      if (!subtheme) {
        this.logger.warn(`Subtheme with title '${title}' not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }
      this.logger.log(`Found subtheme with title '${title}'`);

      return subtheme;
    } catch (error) {
      const errorMessage = `Failed to find subtheme with title '${title}': ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findAll(): Promise<
    Subtheme[] | { status: HttpStatus; message: string }
  > {
    try {
      const subthemes = await this.subthemeRepository.find({
        relations: ["questions"],
      });

      if (!subthemes || subthemes.length === 0) {
        this.logger.warn(`No subthemes found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found ${subthemes.length} subthemes`);

      return subthemes;
    } catch (error) {
      const errorMessage = `Failed to find subthemes: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async create(
    dto: CreateSubthemeInput,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    const { themeTitle, ...dtoFields } = dto;

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

      const newSubtheme = this.subthemeRepository.create({
        ...dtoFields,
        theme: theme,
      });

      await this.subthemeRepository.save(newSubtheme);

      this.logger.log(
        `Created subtheme with title: ${newSubtheme.title} under theme: ${theme.title}`,
      );

      return {
        status: HttpStatus.CREATED,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to create subtheme: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async update(
    subthemeTitle: string,
    dto: Partial<Subtheme>,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    try {
      const subtheme: Subtheme = await this.subthemeRepository.findOne({
        where: { title: subthemeTitle },
      });
      if (!subtheme) {
        this.logger.warn(`Subtheme with Title ${subthemeTitle} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      Object.assign(subtheme, dto);
      await this.subthemeRepository.save(subtheme);

      this.logger.log(`Updated subtheme with Title ${subthemeTitle}`);

      return {
        status: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to update subtheme with Title ${subthemeTitle}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async remove(
    subthemeTitle: string,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const subtheme: Subtheme = await this.subthemeRepository.findOne({
        where: { title: subthemeTitle },
      });
      if (!subtheme) {
        this.logger.warn(`Subtheme with Title ${subthemeTitle} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      await this.subthemeRepository.remove(subtheme);

      this.logger.log(`Deleted subtheme with Title ${subthemeTitle}`);

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to delete subtheme with Title ${subthemeTitle}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }
}
