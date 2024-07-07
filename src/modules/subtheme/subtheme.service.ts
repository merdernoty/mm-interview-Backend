import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Subtheme } from "./model/subtheme.model";
import { CreateSubthemeInput } from "./dto/create-subtheme.input";
import { Theme } from "../theme/model/theme.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SubthemeService {
  constructor(
    @InjectRepository(Subtheme)
    private readonly subthemeRepository: Repository<Subtheme>,
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async findOneById(
    id: number,
  ): Promise<Subtheme | { status: HttpStatus; message: string }> {
    try {
      const subtheme = await this.subthemeRepository.findOne({
        where: { id },
        relations: ["questions"],
      });
      if (!subtheme) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }
      return subtheme;
    } catch (error) {
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
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }
      return subtheme;
    } catch (error) {
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
      return await this.subthemeRepository.find({ relations: ["questions"] });
    } catch (error) {
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
        return {
          status: HttpStatus.NOT_FOUND,
          message: `error`,
        };
      }

      const newSubtheme = this.subthemeRepository.create({
        ...dtoFields,
        theme: theme,
      });

      await this.subthemeRepository.save(newSubtheme);
      return {
        status: HttpStatus.CREATED,
        message: "successful",
      };
    } catch (error) {
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
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      Object.assign(subtheme, dto);
      await this.subthemeRepository.save(subtheme);
      return {
        status: HttpStatus.OK,
        message: "successful",
      };
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
      const subtheme: Subtheme = await this.subthemeRepository.findOne({
        where: { id },
      });
      if (!subtheme) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }

      await this.subthemeRepository.remove(subtheme);
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
