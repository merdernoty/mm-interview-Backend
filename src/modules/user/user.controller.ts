import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "./model/user.model";
import { Roles } from "src/decorators/roles-auth.decorator";
import { RolesGuard } from "src/guard/roles.guard";

@ApiTags("Пользователи")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles("ADMIN")
  // @ApiBearerAuth("JWT-auth")
  // @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Получить пользователя по Email" })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles("ADMIN")
  // @ApiBearerAuth("JWT-auth")
  // @UseGuards(RolesGuard)
  @Get("/byEmail/:email")
  getUserByEmail(@Param("email") email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ApiOperation({ summary: "Получить пользователя по Email" })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles("ADMIN")
  // @ApiBearerAuth("JWT-auth")
  // @UseGuards(RolesGuard)
  @Get("/:id")
  getUserById(@Param("id") id: number) {
    return this.userService.findOneById(id);
  }
}
