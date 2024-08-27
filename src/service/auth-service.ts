import jsonwebtoken from "jsonwebtoken";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  toRegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
} from "../model/auth-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.LoginValidation,
      request
    );

    const user = await prisma.users.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "username atau password salah");
    }

    const token: string = jsonwebtoken.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 7200,
      }
    );

    return toLoginResponse(token);
  }

  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    const requestBody: RegisterRequest = Validation.validate(
      AuthValidation.RegisterValidation,
      request
    );

    const isEmailExistInDb = await prisma.users.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailExistInDb) {
      throw new ErrorResponse(404, "email already exists");
    }

    const [users] = await prisma.$transaction([
      prisma.users.create({
        data: {
          email: requestBody.email,
          name: requestBody.name,
          username: requestBody.username,
          password: await Bun.password.hash(requestBody.password),
        },
      }),
    ]);

    return toRegisterResponse(users);
  }
}
