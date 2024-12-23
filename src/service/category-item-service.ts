import { prisma } from "../app/database";
import { toCategoryItemsResponse } from "../model/category-item-model";

export class CategoryItemService {
  static async getAllCategoryItems() {
    const result = await prisma.category_item.findMany();
    return toCategoryItemsResponse(result);
  }
}
