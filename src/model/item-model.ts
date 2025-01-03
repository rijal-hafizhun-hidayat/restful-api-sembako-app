import type { category, item } from "@prisma/client";

export interface ItemRequest {
  name: string;
  price: number;
  description: string;
  category: category;
}

export interface ItemWithCategoryItemWithCategory {
  id: number;
  name: string;
  price: number;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  category_item: CategoryItemWithCategory | null;
}

export interface CategoryItemWithCategory {
  id: number;
  item_id: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  category: category;
}

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

export function toItemResponse(item: item): item {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export function toItemWithCategoryItemWithCategoryResponse(
  item: ItemWithCategoryItemWithCategory
): ItemWithCategoryItemWithCategory {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description ? item.description : null,
    created_at: item.created_at,
    updated_at: item.updated_at,
    category_item: item.category_item
      ? {
          id: item.category_item.id,
          item_id: item.category_item.item_id,
          category_id: item.category_item.category_id,
          created_at: item.category_item.created_at,
          updated_at: item.category_item.updated_at,
          category: {
            id: item.category_item.category.id,
            name: item.category_item.category.name,
            created_at: item.category_item.category.created_at,
            updated_at: item.category_item.category.updated_at,
          },
        }
      : null,
  };
}
