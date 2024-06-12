import { UserController } from "./user.controller";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
