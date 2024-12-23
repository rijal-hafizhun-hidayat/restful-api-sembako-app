import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  type LoginRequest,
  type LoginResponse,
} from "../model/auth-model";
import { BlacklistUtils } from "../utils/Blacklist-utils";
import { TokenUtils } from "../utils/token-utils";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "email or password is not match");
    }

    const isPasswordMatch = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ErrorResponse(404, "email or password is not match");
    }

    const token: string = await TokenUtils.generateToken(user);

    return toLoginResponse(token);
  }

  static async logout(tokenHeader: string) {
    const [, token] = tokenHeader.split(" ");

    if (BlacklistUtils.hasTokenBlacklist(token)) {
      throw new ErrorResponse(401, "Token has been blacklisted");
    }

    BlacklistUtils.addTokenBlacklist(token);
  }
}
