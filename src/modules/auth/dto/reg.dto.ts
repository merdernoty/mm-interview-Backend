import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class RegDto {
  @ApiProperty({ example: "test@gmail.com", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;

  @ApiProperty({ example: "igorao", description: "Никнейм" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 20, { message: "От 4 до 20 символов" })
  readonly username: string;

  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "От 4 до 16 символов" })
  readonly password: string;
}
