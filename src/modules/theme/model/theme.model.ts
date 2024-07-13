import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Subtheme } from "../../subtheme/model/subtheme.model";
import { Award } from "../interface/Award";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: "Title" })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ description: "Description" })
  description: string;

  @Column("jsonb", {
    nullable: true,
    default: {
      id: 0,
      title: "themeAward",
      image: "jpg",
      description: "u are cool",
    }, // Дефолтное значение для award
  })
  @ApiProperty({ description: "Award" })
  award: Award;

  @Column("jsonb", { nullable: true, default: [] })
  @ApiProperty({ description: "Related themes" })
  relatedThemes: RelatedTheme[];

  @OneToMany(() => Subtheme, (subtheme) => subtheme.theme)
  @ApiProperty({ description: "List of subthemes" })
  subthemes: Subtheme[];
}
