import { OpenaiModule } from "./modules/openai/openai.module";
import { OpenaiService } from "./modules/openai/openai.service";
import { QraphqlModule } from "./graphql/qraphql.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { UsersResolver } from "./modules/users/users.resolver";

@Module({
  imports: [
    OpenaiModule,
    QraphqlModule,
    AuthModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [UsersResolver],
})
export class AppModule {}
