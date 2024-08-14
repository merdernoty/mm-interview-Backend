import { Module } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { RolesModule } from "./modules/roles/roles.module";
import { AuthModule } from "./modules/auth/auth.module";
import { OpenaiModule } from "./modules/openai/openai.module";
import { UserModule } from "./modules/user/user.module";
import { QuestionModule } from "./modules/question/question.module";
import { ThemeModule } from "./modules/theme/theme.module";
import { DatabaseModule } from "./database/database.module";
import { UploadModule } from "./modules/upload/upload.module";
import { GraphqlModule } from "./graphQL/Graphql.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>("redis.host"),
            port: configService.get<number>("redis.port"),
          },
          database: configService.get<number>("redis.db"),
        });
        return { store };
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 10,
        limit: 5,
      },
    ]),
    UploadModule,
    RolesModule,
    AuthModule,
    OpenaiModule,
    UserModule,
    QuestionModule,
    ThemeModule,
    DatabaseModule,
    GraphqlModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
