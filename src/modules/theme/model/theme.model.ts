import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Subtheme } from "../../subtheme/model/subtheme.model";

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

  @Column({ nullable: false })
  @ApiProperty({ description: "award name" })
  award: string;

  @OneToMany(() => Subtheme, (subtheme) => subtheme.theme)
  @ApiProperty({ description: "List of subthemes" })
  subthemes: Subtheme[];
}
