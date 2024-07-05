import { forwardRef, Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./model/roles.model";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => UserModule)],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
