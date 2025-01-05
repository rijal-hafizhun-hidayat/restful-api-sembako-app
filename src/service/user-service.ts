import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUsersWithUserRoleAndRoleResponse,
  toUserWithUserRoleAndRoleResponse,
  type UserWithRoleRequest,
  type UserWithUserRoleAndRoleResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

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

  static async destroyUserByUserId(
    userId: number
  ): Promise<UserWithUserRoleAndRoleResponse> {
    const isUserExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [destroyUser] = await prisma.$transaction([
      prisma.user.delete({
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
      }),
    ]);

    return toUserWithUserRoleAndRoleResponse(destroyUser);
  }

  static async storeUser(
    request: UserWithRoleRequest
  ): Promise<UserWithUserRoleAndRoleResponse> {
    const requestBody: UserWithRoleRequest = Validation.validate(
      UserValidation.userWithRoleSchema,
      request
    );

    const isEmailAlreadyExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailAlreadyExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const hashPassword = await Bun.password.hash(requestBody.password);
    const [storeUser] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: hashPassword,
          user_role: {
            create: {
              role_id: requestBody.role.id,
            },
          },
        },
        include: {
          user_role: {
            include: {
              role: true,
            },
          },
        },
      }),
    ]);

    return toUserWithUserRoleAndRoleResponse(storeUser);
  }

  static async updateUserByUserId(
    request: UserWithRoleRequest,
    userId: number
  ) {
    const requestBody: UserWithRoleRequest = Validation.validate(
      UserValidation.updateUserWithRoleSchema,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: true,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    const [updateUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: user.password,
          user_role: {
            update: {
              where: {
                id: user.user_role!.id,
              },
              data: {
                role_id: requestBody.role.id,
              },
            },
          },
        },
        include: {
          user_role: {
            include: {
              role: true,
            },
          },
        },
      }),
    ]);

    return updateUser;
  }
}
