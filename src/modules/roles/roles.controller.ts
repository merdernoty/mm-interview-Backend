import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "./model/roles.model";
import { Roles } from "src/decorators/roles-auth.decorator";
import { RolesGuard } from "src/guard/roles.guard";
import { RolesService } from "./roles.service";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Создание роли" })
  @ApiResponse({ status: 200, type: Role })
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get("/:title")
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  getByTitle(@Param("title") title: string) {
    return this.roleService.getRoleByTitle(title);
  }

  @Get("/:id")
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  getById(@Param("id") id: number) {
    return this.roleService.getRoleById(id);
  }

  @Put("/:id")
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  updateRole(@Param("id") id: number, @Body() dto: CreateRoleDto) {
    return this.roleService.updateRole(id, dto);
  }

  @Delete("/:id")
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  deleteRole(@Param("id") id: number) {
    return this.roleService.deleteRole(id);
  }

  @Get()
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(RolesGuard)
  getAll() {
    return this.roleService.getAll();
  }
}
