import { Subcategory } from "./subcategory.model";

export interface Product{
    id?: number;
    name?: string;
    description?: string;
    subcategoryId?: Subcategory;
}