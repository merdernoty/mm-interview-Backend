import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subtheme } from "../../subtheme/model/subtheme.model";
import { Award } from "../interface/Award";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: "default-image-url.jpg" })
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
  award: Award;

  @Column("jsonb", { nullable: true, default: [] })
  relatedThemes: RelatedTheme[];

  @OneToMany(() => Subtheme, (subtheme) => subtheme.theme)
  subthemes: Subtheme[];
}
