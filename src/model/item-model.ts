import type { item } from "@prisma/client";

export function toItemsResponse(items: item[]): item[] {
  return items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  });
}
