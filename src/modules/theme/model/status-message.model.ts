import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class StatusMessage {
  @Field((type) => Int)
  status: number;

  @Field()
  message: string;
}
