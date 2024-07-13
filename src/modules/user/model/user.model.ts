import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../../question/model/question.model';
import { Role } from 'src/modules/roles/model/roles.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id: number;

  @Index({ unique: true })
  @Column()
  username: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @ApiProperty({ description: 'Photo' })
  @Column({ default: null })
  image: string;

  @ApiProperty({ description: 'Password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Favorite questions', type: [String] })
  @Column({ type: 'jsonb', nullable: true })
  favoriteQuestions: Question[];

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;
}
