import { forwardRef, Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./model/roles.model";
import { UserModule } from "../user/user.module";
import { RolesGuard } from "src/guard/roles.guard";
import { RolesController } from "./roles.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => UserModule),
    JwtModule,
  ],
  providers: [RolesService, RolesGuard],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
