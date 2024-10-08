import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./model/user.model";
import * as bcrypt from "bcryptjs";
import { RegDto } from "../auth/dto/reg.dto";
import { RolesService } from "../roles/roles.service";
import { ChangeUserDataDto } from "./dto/change-userdata";
import { UploadService } from "../upload/upload.service";
import { Question } from "../question/model/question.model";
import { UserInfo } from "./interface/userInfo";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly uploadRepository: UploadService,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
  async findByUsername(
    username: string,
  ): Promise<User | { status: HttpStatus; message: string }> {
    const user = this.userRepository.findOne({ where: { username: username } });
    try {
      if (!user) {
        this.logger.warn(`Theme with id ${username} not found`);
        return {
          status: HttpStatus.NOT_FOUND,
          message: "error",
        };
      }
      this.logger.log(`Found user with username '${username}'`);
      return user;
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "error",
      };
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    Logger.log("User with id: " + id);
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ["id", "email", "username", "info", "image"],
    });

    if (!user) {
      Logger.warn("User with id: " + user.id + " wasn't found");
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    Logger.log("User with id: " + user.id + " got");

    return user;
  }

  async changeMyselfDate(
    dto: ChangeUserDataDto,
    userId: number,
    imageUrl?: any,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ["id", "email", "username", "info", "image"],
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const updatedFields = { ...dto };
    if (imageUrl) {
      const uploadedImageUrl = await this.uploadRepository.uploadFile(imageUrl);
      updatedFields["image"] = uploadedImageUrl;
    }

    try {
      await this.userRepository.update(userId, updatedFields);

      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
        select: ["id", "email", "username", "info", "image"],
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        "Failed to update user",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: RegDto) {
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
      return user;
    } catch (error) {
      Logger.error("Error registration user: ", error.message, error.stack);
      throw new HttpException(
        "Error registration",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFavById(id: any): Promise<Question[]> {
    Logger.log("Fetching user with id: " + id);

    const user = await this.userRepository
      .createQueryBuilder("user")
      .select("user.info")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      Logger.warn("User with id: " + id + " wasn't found");
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const info = user.info as UserInfo;

    if (
      !info ||
      !info.favoriteQuestions ||
      !Array.isArray(info.favoriteQuestions)
    ) {
      Logger.warn(
        "Favorite questions are not available or in unexpected format",
      );
      return [];
    }

    return info.favoriteQuestions;
  }
}
