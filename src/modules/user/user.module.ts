import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./model/user.model";
import { Role } from "../roles/model/roles.model";
import { RolesModule } from "../roles/roles.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => RolesModule),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
