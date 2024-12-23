import type { category_item } from "@prisma/client";

export interface CategoryItemRequest {
  name: string;
}

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

export function toCategoryItemResponse(
  categoryItem: category_item
): category_item {
  return {
    id: categoryItem.id,
    name: categoryItem.name,
    created_at: categoryItem.created_at,
    updated_at: categoryItem.updated_at,
  };
}
