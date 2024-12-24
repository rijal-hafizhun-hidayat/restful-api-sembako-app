import { prisma } from "../app/database";
import { toItemsResponse } from "../model/item-model";

export class ItemService {
  static async getAllItems() {
    const items = await prisma.item.findMany();
    return toItemsResponse(items);
  }
}
