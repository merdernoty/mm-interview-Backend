import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subtheme } from "../../subtheme/model/subtheme.model";
import { Award } from "../interface/Award";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLAward } from "../graphQL/award.model";
import { GraphQLRelatedTheme } from "../graphQL/related-theme.model";

@ObjectType()
@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  title: string;
  @Column({ nullable: false })
  @Field()
  description: string;

  @Column({ nullable: false, default: "default-image-url.jpg" })
  @Field()
  image: string;

  @Column("jsonb", {
    nullable: true,
    default: {
      id: 0,
      title: "themeAward",
      image: "jpg",
      description: "u are cool",
    },
  })
  @Field(() => GraphQLAward)
  award: Award;

  @Column("jsonb", { nullable: true, default: [] })
  @Field(() => [GraphQLRelatedTheme])
  relatedThemes: RelatedTheme[];

  @OneToMany(() => Subtheme, (subtheme) => subtheme.theme)
  @Field(() => [Subtheme])
  subthemes: Subtheme[];
}
