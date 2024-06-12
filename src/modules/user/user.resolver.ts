import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UsersService } from "./user.service";
import { User } from "./model/user.model";
import { CreateUserInput } from "./dto/create-user.input";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }
}
