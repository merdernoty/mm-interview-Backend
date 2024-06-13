import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";

import { Module } from "@nestjs/common";
import { User } from "./model/user.model";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
