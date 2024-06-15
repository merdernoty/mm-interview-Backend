import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    userName: string;

    @Field()
    @Column()
    email: string;

    @ApiProperty({ description: "Password" })
    @Column()
    password: string;

    @ApiProperty({ description: "Favorite questions", type: [String] })
    @Column({ type: "jsonb", nullable: true })
    favoriteQuestions: any[];
}
