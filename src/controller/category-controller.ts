import type { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category-service";
import type { CategoryRequest } from "../model/category-model";

export class CategoryController {
  static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CategoryService.getAllCategories();
      return res.status(200).json({
        statusCode: 200,
        message: "success get category",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: CategoryRequest = req.body as CategoryRequest;
      const result = await CategoryService.storeCategory(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store category",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryByCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoryItemId = Number(req.params.categoryId);
      const result = await CategoryService.getCategoryByCategoryId(
        categoryItemId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success get category",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoryByCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoryItemId = Number(req.params.categoryId);
      const request: CategoryRequest = req.body as CategoryRequest;
      const result = await CategoryService.updateCategoryByCategoryId(
        categoryItemId,
        request
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success update category",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryByCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const categoryItemId = Number(req.params.categoryItemId);
      const result = await CategoryService.deleteCategoryByCategoryId(
        categoryItemId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success delete category",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
