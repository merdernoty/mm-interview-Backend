import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./model/user.model";
import { Role } from "../roles/model/roles.model";
import { RolesModule } from "../roles/roles.module";
import { JwtModule } from "@nestjs/jwt";
import { Question } from "../question/model/question.model";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Question]),
    forwardRef(() => RolesModule),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
