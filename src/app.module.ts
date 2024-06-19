import { OpenaiModule } from "./modules/openai/openai.module";
import { QraphqlModule } from "./graphql/qraphql.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { QuestionModule } from "./modules/question/question.module";
import { ThemeModule } from "./modules/theme/theme.module";

@Module({
  imports: [
    OpenaiModule,
    QraphqlModule,
    AuthModule,
    UserModule,
    QuestionModule,
    ThemeModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
