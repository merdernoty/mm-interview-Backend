import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: 3, description: "Значение роли" })
  readonly title: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  readonly description: string;

  @ApiProperty({ example: 1, description: "Уровень доступа" })
  readonly level_access: number;
}
