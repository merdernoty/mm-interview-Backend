import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./model/user.model";
import { CreateUserInput } from "./dto/create-user.input";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findOneByUsername(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName } });
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = this.usersRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}
