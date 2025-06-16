export interface Product {
    id: bigint;
    article: string;
    name: string;
    description?: string;
    product_unit: string;
    quantity: number;
    price: number;
    picture?: string;
    tags?: Tag[];
}

export enum Tag {
  SPECIAL_PRICE = "SPECIAL_PRICE",
  CUPS = "CUPS",
  PLATES = "PLATES",
  TEAPOT ="TEAPOT",
  TECH = "TECH"
}
