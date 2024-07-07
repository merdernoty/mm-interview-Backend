import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { Roles } from "src/decorators/roles-auth.decorator";
import { RolesGuard } from "src/guard/roles.guard";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegDto } from "./dto/reg.dto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Авторизация",
  })
  @ApiResponse({ status: 200 })
  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({
    summary: "Регистрация",
  })
  @ApiResponse({ status: 200 })
  @Post("/reg")
  reg(@Body() dto: RegDto) {
    return this.authService.reg(dto);
  }

  @ApiOperation({
    summary: "Проверка токена на валидность",
  })
  @ApiResponse({ status: 200 })
  @Get("/validate")
  async validateToken() {
    return this.authService.validateToken();
  }
}
