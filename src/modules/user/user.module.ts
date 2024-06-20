import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./model/user.model";
import { QraphqlModule } from "../../graphql/qraphql.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), QraphqlModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
