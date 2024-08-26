import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toItemsResponse,
  type ItemsRequest,
  type ItemsResponse,
} from "../model/items-model";
import { ItemsValidation } from "../validation/items-validation";
import { Validation } from "../validation/validation";

export class ItemsService {
  static async getAll(): Promise<any> {
    const items = await prisma.items.findMany({});

    return items;
  }

  static async store(request: ItemsRequest): Promise<ItemsResponse> {
    const requestBody: ItemsRequest = Validation.validate(
      ItemsValidation.itemsRequest,
      request
    );

    const [items] = await prisma.$transaction([
      prisma.items.create({
        data: {
          name: requestBody.name,
          price: requestBody.price,
        },
      }),
    ]);

    return toItemsResponse(items);
  }

  static async findByItemsId(itemsId: number): Promise<ItemsResponse> {
    const items = await prisma.items.findUnique({
      where: {
        id: itemsId,
      },
    });

    if (!items) {
      throw new ErrorResponse(404, "item not found");
    }

    return toItemsResponse(items);
  }

  static async updateByItemsId(
    itemsId: number,
    request: ItemsRequest
  ): Promise<ItemsResponse> {
    const requestBody: ItemsRequest = Validation.validate(
      ItemsValidation.itemsRequest,
      request
    );
    const [items] = await prisma.$transaction([
      prisma.items.update({
        where: {
          id: itemsId,
        },
        data: {
          name: requestBody.name,
          price: requestBody.price,
        },
      }),
    ]);

    return toItemsResponse(items);
  }

  static async destroyByItemsId(itemsId: number): Promise<ItemsResponse> {
    const [items] = await prisma.$transaction([
      prisma.items.delete({
        where: {
          id: itemsId,
        },
      }),
    ]);

    return toItemsResponse(items);
  }
}
