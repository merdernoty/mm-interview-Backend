import { RolesModule } from "./modules/roles/roles.module";
import { AuthModule } from "./modules/auth/auth.module";
import { OpenaiModule } from "./modules/openai/openai.module";
import { UserModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { QuestionModule } from "./modules/question/question.module";
import { ThemeModule } from "./modules/theme/theme.module";
import { UploadModule } from "./modules/upload/upload.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UploadModule,
    RolesModule,
    AuthModule,
    OpenaiModule,
    UserModule,
    QuestionModule,
    ThemeModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
