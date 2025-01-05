import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUsersWithUserRoleAndRoleResponse,
  toUserWithUserRoleAndRoleResponse,
  type UserWithUserRoleAndRoleResponse,
} from "../model/user-model";

export class UserService {
  static async getAllUser(): Promise<UserWithUserRoleAndRoleResponse[]> {
    const result = await prisma.user.findMany({
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    return toUsersWithUserRoleAndRoleResponse(result);
  }

  static async getUserByUserId(
    userId: number
  ): Promise<UserWithUserRoleAndRoleResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toUserWithUserRoleAndRoleResponse(user);
  }
}
