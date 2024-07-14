import { Body, Controller, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
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

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Получения пользователя по токену' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async getMe(@Request() req) {
      const id = req.user.id
      return this.userService.getUserById(id)
  }


  @ApiOperation({ summary: 'Замена информации самим пользователем' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put('/me')
  @UseInterceptors(FileInterceptor('image'))
  async changeMyselfDate(
      @Body() dto: ChangeUserDataDto,
      @Request() req,
      @UploadedFile() imageUrl: any
  ) {
      const userId = req.user.id
      return this.userService.changeMyselfDate(dto, userId, imageUrl)
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

  @ApiOperation({ summary: "Получить пользователя по Email" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  @Get("/:id")
  getUserById(@Param("id") id: number) {
    return this.userService.findOneById(id);
  }
}
