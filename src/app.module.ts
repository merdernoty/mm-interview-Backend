import { AuthModule } from "./modules/auth/auth.module";
import { OpenaiModule } from "./modules/openai/openai.module";
import { UserModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { QuestionModule } from "./modules/question/question.module";
import { ThemeModule } from "./modules/theme/theme.module";

@Module({
  imports: [
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
