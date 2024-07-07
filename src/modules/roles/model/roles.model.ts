import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/model/user.model";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Role {
  @ApiProperty({ example: "1", description: "Айди" })
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 3, description: "Значение роли" })
  @Index({ unique: true })
  @Column()
  title: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Column()
  description: string;

  @ApiProperty({ example: 3, description: "Значение роли" })
  @Index({ unique: true })
  @Column()
  level_access: number;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
