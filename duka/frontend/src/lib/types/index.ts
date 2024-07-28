export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  selling_price: number;
  buying_price: number;
  category_id: string;
}
