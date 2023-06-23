import { AttributeValue } from "./attribute-value.model";
import { Subcategory } from "./subcategory.model";

export interface ProductAttribute{
    id?: number;
    name: string;
    attributeValues: AttributeValue[];
    subcategories?: Subcategory[];
}