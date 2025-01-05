import type { role, user } from "@prisma/client";

export interface UserWithUserRoleAndRoleResponse {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user_role: UserRoleWithRole | null;
}

export interface UserWithRoleRequest {
  name: string;
  email: string;
  password: string;
  role: role;
}

export interface UserRoleWithRole {
  id: number;
  user_id: number;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  role: role;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export function toUsersWithUserRoleAndRoleResponse(
  users: UserWithUserRoleAndRoleResponse[]
): UserWithUserRoleAndRoleResponse[] {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user_role: user.user_role
      ? {
          id: user.user_role.id,
          user_id: user.user_role.user_id,
          role_id: user.user_role.role_id,
          created_at: user.user_role.created_at,
          updated_at: user.user_role.updated_at,
          role: {
            id: user.user_role.role.id,
            name: user.user_role.role.name,
            created_at: user.user_role.role.created_at,
            updated_at: user.user_role.role.updated_at,
          },
        }
      : null,
  }));
}

export function toUserWithUserRoleAndRoleResponse(
  user: UserWithUserRoleAndRoleResponse
): UserWithUserRoleAndRoleResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user_role: user.user_role
      ? {
          id: user.user_role.id,
          user_id: user.user_role.user_id,
          role_id: user.user_role.role_id,
          created_at: user.user_role.created_at,
          updated_at: user.user_role.updated_at,
          role: {
            id: user.user_role.role.id,
            name: user.user_role.role.name,
            created_at: user.user_role.role.created_at,
            updated_at: user.user_role.role.updated_at,
          },
        }
      : null,
  };
}

export function toUserResponse(user: user): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
