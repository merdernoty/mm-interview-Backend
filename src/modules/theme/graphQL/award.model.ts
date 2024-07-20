import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class GraphQLAward {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field()
  description: string;
}
