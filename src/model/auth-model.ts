import type { users } from "@prisma/client";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = string;

export type RegisterRequest = {
  email: string;
  name: string;
  username: string;
  password: string;
};

export type RegisterResponse = {
  email: string;
  name: string;
};

export function toRegisterResponse(users: users): RegisterResponse {
  return {
    email: users.email,
    name: users.name,
  };
}

export function toLoginResponse(token: string): LoginResponse {
  return token as string;
}
