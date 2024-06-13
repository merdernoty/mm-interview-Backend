import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class AuthResponse {
  @Field()
  @ApiProperty({ description: 'Access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}
