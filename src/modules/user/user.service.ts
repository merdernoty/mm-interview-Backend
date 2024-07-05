import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./model/User.model";
import * as bcrypt from "bcryptjs";
import { RegDto } from "../auth/dto/reg.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(
    dto: RegDto
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      const hashPassword = await bcrypt.hash(dto.password, 10);
      const user = this.userRepository.create({
        password: hashPassword,
        username: dto.username,
        email: dto.email,
      });

      const role = await this.rolesService.getRoleByTitle("USER");
      if (!role) {
        throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
      }

      user.role = role;

      await this.userRepository.save(user);
      Logger.log("User registration successfully");
      return { statusCode: HttpStatus.OK, message: "successful" };
    } catch (error) {
      Logger.error("Error registration user: ", error);
      throw new HttpException(
        "Error registration",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
