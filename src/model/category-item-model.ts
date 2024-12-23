import type { category_item } from "@prisma/client";

export function toCategoryItemsResponse(
  categoryItems: category_item[]
): category_item[] {
  return categoryItems.map((categoryItem) => {
    return {
      id: categoryItem.id,
      name: categoryItem.name,
      created_at: categoryItem.created_at,
      updated_at: categoryItem.updated_at,
    };
  });
}
