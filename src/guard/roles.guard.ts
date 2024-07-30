import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles-auth.decorator";
import { RolesLevel_access } from "src/helpers/roles-access";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRole) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new HttpException(
          "User is not authorized",
          HttpStatus.UNAUTHORIZED
        );
      }

      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      console.log(token);
      if (bearer !== "Bearer" || !token) {
        throw new HttpException(
          "User is not authorized",
          HttpStatus.UNAUTHORIZED
        );
      }

      let user;
      try {
        user = this.jwtService.verify(token, {
          secret: process.env.PRIVATE_KEY || "SECRET",
        });
      } catch (error) {
        throw new HttpException(
          "User is not authorized",
          HttpStatus.UNAUTHORIZED
        );
      }

      req.user = user;
      if (RolesLevel_access[requiredRole] <= user.role.level_access) {
        return true;
      } else {
        throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof HttpException
      ) {
        throw error;
      }
    }
  }
}
