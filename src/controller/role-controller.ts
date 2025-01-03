import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";
import type { RoleRequest } from "../model/role-model";

export class RoleController {
  static async getAllRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await RoleService.getAllRole();
      return res.status(200).json({
        statusCode: 200,
        message: "success get roles",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await RoleService.storeRole(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "success create role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId = parseInt(req.params.roleId);
      const result = await RoleService.getRoleByRoleId(roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RoleRequest = req.body as RoleRequest;
      const roleId = parseInt(req.params.roleId);
      const result = await RoleService.updateRoleByRoleId(request, roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId = parseInt(req.params.roleId);
      const result = await RoleService.destroyRoleByRoleId(roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success delete role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
