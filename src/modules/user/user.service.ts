import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./model/User.model";
import * as bcrypt from "bcryptjs";
import { RegDto } from "../auth/dto/reg.dto";
import { RolesService } from "../roles/roles.service";

import { QuestionService } from "../question/question.service";
import { Question } from "../question/model/question.model";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  //private readonly logger = new Logger(UserService.name); Todo

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(
    dto: RegDto,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const hashPassword = await bcrypt.hash(dto.password, 10);
      const user = this.userRepository.create({
        password: hashPassword,
        username: dto.username,
        email: dto.email,
        info: {
          favoriteQuestions: [],
          completedQuestions: [],
          rewards: [],
        },
      });

      const role = await this.rolesService.getRoleByTitle("USER");

      if (!role) {
        throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
      }

      user.role = role;

      Logger.log("User to be saved:", JSON.stringify(user));

      await this.userRepository.save(user);

      Logger.log("User registration successfully:", JSON.stringify(user));
      return { statusCode: HttpStatus.OK, message: "successful" };
    } catch (error) {
      Logger.error("Error registration user: ", error.message, error.stack);
      throw new HttpException(
        "Error registration",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
