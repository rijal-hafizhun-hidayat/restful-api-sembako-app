import type { role } from "@prisma/client";

export interface RoleRequest {
  name: string;
}

export function toRolesResponse(role: role[]): role[] {
  return role.map((role) => {
    return {
      id: role.id,
      name: role.name,
      created_at: role.created_at,
      updated_at: role.updated_at,
    };
  });
}

export function toRoleResponse(role: role): role {
  return {
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  };
}
