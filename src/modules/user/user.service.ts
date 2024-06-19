import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./model/User.model";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(userName: string): Promise<User> {
    return this.userRepository.findOne({ where: { userName } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserInput): Promise<User> {
    const theme = this.userRepository.create({
      ...dto,
    });
    return this.userRepository.save(theme);
  }
}
