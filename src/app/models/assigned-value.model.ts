import { AttributeValue } from "./attribute-value.model";
import { ProductAttribute } from "./product-attribute.model";
import { Variant } from "./variant.model";

export interface AssignedValue{
  id?: number;
  attributeValueId: AttributeValue;
  productAttributeId: ProductAttribute;
}