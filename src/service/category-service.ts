import type { category } from "@prisma/client";
import { prisma } from "../app/database";
import {
  toCategoryResponse,
  toCategoriesResponse,
  type CategoryRequest,
} from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";
import { ErrorResponse } from "../error/error-response";

export class CategoryService {
  static async getAllCategories(): Promise<category[]> {
    const result = await prisma.category.findMany();
    return toCategoriesResponse(result);
  }

  static async storeCategory(request: CategoryRequest): Promise<category> {
    const requestBody: CategoryRequest = Validation.validate(
      CategoryValidation.categoryRequest,
      request
    );

    const [storeCategory] = await prisma.$transaction([
      prisma.category.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toCategoryResponse(storeCategory);
  }

  static async getCategoryByCategoryId(categoryId: number): Promise<category> {
    const categoryItem = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryItem) {
      throw new ErrorResponse(404, "category not found");
    }

    return toCategoryResponse(categoryItem);
  }

  static async updateCategoryByCategoryId(
    categoryId: number,
    request: CategoryRequest
  ): Promise<category> {
    const requestBody: CategoryRequest = Validation.validate(
      CategoryValidation.categoryRequest,
      request
    );

    const categoryItem = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryItem) {
      throw new ErrorResponse(404, "category not found");
    }

    const [updateCategory] = await prisma.$transaction([
      prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toCategoryResponse(updateCategory);
  }

  static async deleteCategoryByCategoryId(
    categoryId: number
  ): Promise<category> {
    const categoryItem = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryItem) {
      throw new ErrorResponse(404, "category not found");
    }

    const [deleteCategory] = await prisma.$transaction([
      prisma.category.delete({
        where: {
          id: categoryId,
        },
      }),
    ]);

    return toCategoryResponse(deleteCategory);
  }
}
