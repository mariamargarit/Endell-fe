import { Product } from "./product.model";

export interface VariantCreation{
  id?: number;
  productId?: Product;
  availableQuantity?: number;
  addedDate?: string;
  assignedValueDTOList?: number[];
}