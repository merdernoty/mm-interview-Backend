import { Module } from "@nestjs/common";
import { OpenaiController } from "./openai.controller";
import { OpenaiService } from "./openai.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule],
  providers: [
    OpenaiService,
    {
      provide: "OPENAI_API_KEY",
      useFactory: (configService: ConfigService) =>
        configService.get<string>("OPENAI_API_KEY"),
      inject: [ConfigService],
    },
  ],
})
export class OpenaiModule {}
