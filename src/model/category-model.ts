import type { category } from "@prisma/client";

export interface CategoryRequest {
  name: string;
}

export function toCategoriesResponse(categoryItems: category[]): category[] {
  return categoryItems.map((categoryItem) => {
    return {
      id: categoryItem.id,
      name: categoryItem.name,
      created_at: categoryItem.created_at,
      updated_at: categoryItem.updated_at,
    };
  });
}

export function toCategoryResponse(categoryItem: category): category {
  return {
    id: categoryItem.id,
    name: categoryItem.name,
    created_at: categoryItem.created_at,
    updated_at: categoryItem.updated_at,
  };
}
