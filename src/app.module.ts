import { UserModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
