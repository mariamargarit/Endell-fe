import { AssignedValue } from "./assigned-value.model";
import { Product } from "./product.model";

export interface Variant{
    id?: number;
    productId?: Product;
    availableQuantity?: number;
    addedDate?: string;
    assignedValueDTOList: AssignedValue[];
}