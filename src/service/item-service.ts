import type { item } from "@prisma/client";
import { prisma } from "../app/database";
import {
  toItemResponse,
  toItemsResponse,
  toItemWithCategoryItemWithCategoryResponse,
  type ItemRequest,
  type ItemWithCategoryItemWithCategory,
} from "../model/item-model";
import { ItemValidation } from "../validation/item-validation";
import { Validation } from "../validation/validation";
import { ErrorResponse } from "../error/error-response";

export class ItemService {
  static async getAllItems() {
    const items = await prisma.item.findMany();
    return toItemsResponse(items);
  }

  static async storeItem(request: ItemRequest): Promise<item> {
    const requestBody: ItemRequest = Validation.validate(
      ItemValidation.itemWithCategorySchema,
      request
    );

    const [storeItem] = await prisma.$transaction([
      prisma.item.create({
        data: {
          name: requestBody.name,
          price: requestBody.price,
          description: requestBody.description,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.category_item.create({
        data: {
          item_id: storeItem.id,
          category_id: requestBody.category.id,
        },
      }),
    ]);

    return toItemResponse(storeItem);
  }

  static async deleteItemByItemId(itemId: number): Promise<item> {
    const isItemExist = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!isItemExist) {
      throw new ErrorResponse(404, "item not found");
    }

    const [deleteItem] = await prisma.$transaction([
      prisma.item.delete({
        where: {
          id: itemId,
        },
      }),
    ]);

    return toItemResponse(deleteItem);
  }

  static async getItemByItemId(
    itemId: number
  ): Promise<ItemWithCategoryItemWithCategory> {
    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
      include: {
        category_item: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!item) {
      throw new ErrorResponse(404, "item not found");
    }

    return toItemWithCategoryItemWithCategoryResponse(item);
  }
}
