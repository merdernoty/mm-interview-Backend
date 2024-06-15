import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./model/user.model";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UserResolver],
  exports: [UserResolver,UserService],
})
export class UserModule {}
