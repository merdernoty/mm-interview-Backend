import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class AuthInput {
  @Field()
  @ApiProperty({ description: "Username" })
  username: string;

  @Field()
  @ApiProperty({ description: "Password", example: "password123" })
  password: string;
}
