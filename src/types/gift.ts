export interface GoodsProduct {
  brand_name: string;
  product_name: string;
  product_thumb_image_url: string;
  product_price: number;
  brand_image_url: string;
  product_image_url: string;
}

export interface GoodsItem {
  product: GoodsProduct;
}

export type GoodsList = GoodsItem[];
