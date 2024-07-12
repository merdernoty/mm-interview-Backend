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

  async findOneById(
    id: number,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    try {
      const subtheme = await this.subthemeRepository.findOne({
        where: { id },
        relations: ["questions"],
      });

      if (!subtheme) {
        this.logger.warn(`Subtheme with id ${id} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      this.logger.log(`Found subtheme with id ${id}`);

      return subtheme;
    } catch (error) {
      const errorMessage = `Failed to find subtheme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

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
    const { themeId, ...dtoFields } = dto;

    try {
      const theme = await this.themeRepository.findOne({
        where: { id: themeId },
      });

      if (!theme) {
        this.logger.warn(`Theme with id ${themeId} not found`);
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
    id: number,
    dto: Partial<Subtheme>,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    try {
      const subtheme: Subtheme = await this.subthemeRepository.findOne({
        where: { id },
      });
      if (!subtheme) {
        this.logger.warn(`Subtheme with id ${id} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      Object.assign(subtheme, dto);
      await this.subthemeRepository.save(subtheme);

      this.logger.log(`Updated subtheme with id ${id}`);

      return {
        status: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to update subtheme with id ${id}: ${error.message}`;
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
      const subtheme: Subtheme = await this.subthemeRepository.findOne({
        where: { id },
      });
      if (!subtheme) {
        this.logger.warn(`Subtheme with id ${id} not found`);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      await this.subthemeRepository.remove(subtheme);

      this.logger.log(`Deleted subtheme with id ${id}`);

      return {
        statusCode: HttpStatus.OK,
        message: "successful",
      };
    } catch (error) {
      const errorMessage = `Failed to delete subtheme with id ${id}: ${error.message}`;
      this.logger.error(errorMessage);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }
}
