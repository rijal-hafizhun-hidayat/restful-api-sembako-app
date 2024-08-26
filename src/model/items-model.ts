import type { items } from "@prisma/client";

export type ItemsRequest = {
  name: string;
  price: number;
};

export type ItemsResponse = {
  id: number;
  name: string;
  price: number;
  created_at: Date;
  updated_at: Date;
};

export function toItemsResponse(items: items): ItemsResponse {
  return {
    id: items.id,
    name: items.name,
    price: items.price,
    created_at: items.created_at,
    updated_at: items.updated_at,
  };
}
