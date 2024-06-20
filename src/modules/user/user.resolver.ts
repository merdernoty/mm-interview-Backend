import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./model/user.model";
import { CreateUserInput } from "./dto/create-user.input";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }
}
