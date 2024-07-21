import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
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
import { FileInterceptor } from "@nestjs/platform-express";
import { ChangeUserDataDto } from "./dto/change-userdata";
import { JwtAuthGuard } from "src/guard/jwtAuth.guard";

@ApiTags("Пользователи")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  // @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Получения пользователя по токену" })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Post("/me")
  async getMe(@Request() req) {
    const id = req.user.id;
    this.logger.log("id " + { id });
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: "Замена информации самим пользователем" })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Put("/me")
  @UseInterceptors(FileInterceptor("image"))
  async changeMyselfDate(
    @Body() dto: ChangeUserDataDto,
    @Request() req,
    @UploadedFile() imageUrl: any,
  ) {
    const userId = req.user.id;

    return this.userService.changeMyselfDate(dto, userId, imageUrl);
  }

  @ApiOperation({ summary: "Получить пользователя по Email" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  @Get("/byEmail/:email")
  getUserByEmail(@Param("email") email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ApiOperation({ summary: "Получить пользователя по id" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  @Get("byId/:id")
  getUserById(@Param("id") id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: "Получить пользователя по id" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("USER")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  @Get("byUsername/:username")
  getUserByUsername(@Param("username") username: string) {
    this.logger.log(`Запрос на получение пользователя с username $`);

    Logger.log("asd " + username);
    return this.userService.findByUsername(username);
  }
}
