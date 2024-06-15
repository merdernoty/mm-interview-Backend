import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "secret123",
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
