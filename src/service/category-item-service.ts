import type { category_item } from "@prisma/client";
import { prisma } from "../app/database";
import {
  toCategoryItemResponse,
  toCategoryItemsResponse,
  type CategoryItemRequest,
} from "../model/category-item-model";
import { CategoryItemValidation } from "../validation/category-item-validation";
import { Validation } from "../validation/validation";

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
}
