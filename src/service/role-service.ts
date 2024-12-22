import type { role } from "@prisma/client";
import { prisma } from "../app/database";
import {
  toRoleResponse,
  toRolesResponse,
  type RoleRequest,
} from "../model/role-model";
import { Validation } from "../validation/validation";
import { RoleValidation } from "../validation/role-validation";
import { ErrorResponse } from "../error/error-response";

export class RoleService {
  static async getAllRole(): Promise<role[]> {
    const roles = await prisma.role.findMany();
    return toRolesResponse(roles);
  }

  static async storeRole(request: RoleRequest): Promise<role> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.roleRequest,
      request
    );

    const [storeRole] = await prisma.$transaction([
      prisma.role.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(storeRole);
  }

  static async getRoleByRoleId(roleId: number): Promise<role> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    return toRoleResponse(role);
  }

  static async updateRoleByRoleId(
    request: RoleRequest,
    roleId: number
  ): Promise<role> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.roleRequest,
      request
    );

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    const [updateRole] = await prisma.$transaction([
      prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(updateRole);
  }

  static async destroyRoleByRoleId(roleId: number): Promise<role> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    const [deleteRole] = await prisma.$transaction([
      prisma.role.delete({
        where: {
          id: roleId,
        },
      }),
    ]);

    return toRoleResponse(deleteRole);
  }
}
