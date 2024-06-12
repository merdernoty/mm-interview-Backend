import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./user.controller";

import { Module } from "@nestjs/common";
import { User } from "./model/user.model";
import { UsersService } from "./user.service";
import { UsersResolver } from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
