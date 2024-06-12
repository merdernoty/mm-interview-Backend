import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { UsersResolver } from "./modules/user/user.resolver";
@Module({
  imports: [AuthModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [UsersResolver],
})
export class AppModule {}
