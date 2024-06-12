import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../user/user.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(userName);
    if (user && (await bcrypt.compare(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const payload = { userName: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
