import type { category_item } from "@prisma/client";
import { prisma } from "../app/database";
import {
  toCategoryItemResponse,
  toCategoryItemsResponse,
  type CategoryItemRequest,
} from "../model/category-item-model";
import { CategoryItemValidation } from "../validation/category-item-validation";
import { Validation } from "../validation/validation";
import { ErrorResponse } from "../error/error-response";

export class CategoryItemService {
  static async getAllCategoryItems(): Promise<category_item[]> {
    const result = await prisma.category_item.findMany();
    return toCategoryItemsResponse(result);
  }

  static async storeCategoryItem(
    request: CategoryItemRequest
  ): Promise<category_item> {
    const requestBody: CategoryItemRequest = Validation.validate(
      CategoryItemValidation.categoryItemRequest,
      request
    );

    const [storeCategoryItem] = await prisma.$transaction([
      prisma.category_item.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toCategoryItemResponse(storeCategoryItem);
  }

  static async getCategoryItemById(
    categoryItemId: number
  ): Promise<category_item> {
    const categoryItem = await prisma.category_item.findUnique({
      where: {
        id: categoryItemId,
      },
    });

    if (!categoryItem) {
      throw new ErrorResponse(404, "category item not found");
    }

    return toCategoryItemResponse(categoryItem);
  }

  static async updateCategoryItemByCategoryItemId(
    categoryItemId: number,
    request: CategoryItemRequest
  ): Promise<category_item> {
    const requestBody: CategoryItemRequest = Validation.validate(
      CategoryItemValidation.categoryItemRequest,
      request
    );

    const categoryItem = await prisma.category_item.findUnique({
      where: {
        id: categoryItemId,
      },
    });

    if (!categoryItem) {
      throw new ErrorResponse(404, "category item not found");
    }

    const [updateCategoryItem] = await prisma.$transaction([
      prisma.category_item.update({
        where: {
          id: categoryItemId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toCategoryItemResponse(updateCategoryItem);
  }

  static async deleteCategoryItemByCategoryItemId(
    categoryItemId: number
  ): Promise<category_item> {
    const categoryItem = await prisma.category_item.findUnique({
      where: {
        id: categoryItemId,
      },
    });

    if (!categoryItem) {
      throw new ErrorResponse(404, "category item not found");
    }

    const [deleteCategory] = await prisma.$transaction([
      prisma.category_item.delete({
        where: {
          id: categoryItemId,
        },
      }),
    ]);

    return toCategoryItemResponse(deleteCategory);
  }
}
