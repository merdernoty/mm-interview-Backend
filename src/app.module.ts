import { QraphqlModule } from "./graphql/qraphql.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { UsersResolver } from "./modules/users/users.resolver";

@Module({
  imports: [QraphqlModule, AuthModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [UsersResolver],
})
export class AppModule {}
