import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./model/roles.model";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(dto);
    await this.roleRepository.save(role);
    return role;
  }

  async getAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ["users"] });
  }

  async getRoleByTitle(title: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { title } });
  }

  async getRoleById(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async deleteRole(id: number): Promise<{ status: number; message: string }> {
    await this.roleRepository.delete(id);
    return { status: HttpStatus.OK, message: "Role deleted" };
  }

  async updateRole(id: number, dto: CreateRoleDto): Promise<Role> {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new Error("Role not found");
    }
    role.title = dto.title;
    role.description = dto.description;
    await this.roleRepository.save(role);
    return role;
  }
}
