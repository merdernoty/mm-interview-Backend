import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { Question } from "./model/question.model";
import { Subtheme } from "../subtheme/model/subtheme.model";
import { SubthemeModule } from "../subtheme/subtheme.module";
import { User } from "../user/model/user.model";
import { Role } from "../roles/model/roles.model";
import { RolesModule } from "../roles/roles.module";
import { JwtModule } from "@nestjs/jwt";
import { UploadModule } from "../upload/upload.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Question]),
    forwardRef(() => RolesModule),
    JwtModule,
    UploadModule,
    SubthemeModule,
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
