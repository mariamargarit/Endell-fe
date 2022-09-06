import { Product } from "./product.model";

export interface Variant{
    id?: number;
    productId?: Product;
    availableQuantity?: number;
    price?: number;
    addedDate?: string;
    variantPicture?: string;
}