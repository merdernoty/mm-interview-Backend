import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "src/modules/user/model/user.model";
import { UserService } from "src/modules/user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegDto } from "./dto/reg.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    Logger.log("User was logged in successfully");
    return this.generateToken(user);
  }

  async reg(dto: RegDto) {
    const user = await this.userService.create(dto);
    return user;
  }
  async validateToken() {
    return { message: "valid" };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    console.log(user);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    Logger.log("Wrong email or password");
    throw new UnauthorizedException({ message: "Wrong email or password" });
  }
}
