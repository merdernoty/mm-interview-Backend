import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class GraphQLRelatedTheme {
  @Field()
  image: string;

  @Field()
  title: string;
}
