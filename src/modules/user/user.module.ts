import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./model/user.model";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true, // Автоматически генерировать схему GraphQL
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService], // Если необходимо экспортировать для использования в других модулях
})
export class UserModule {}
