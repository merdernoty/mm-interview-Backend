import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreateUserInput {
  @Field()
  @ApiProperty({ description: "Username" })
  userName: string;

  @Field()
  @ApiProperty({ description: "Email" })
  email: string;

  @Field()
  @ApiProperty({ description: "Password" })
  password: string;
}
