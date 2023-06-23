import { Brand } from "./brand.model";
import { Subcategory } from "./subcategory.model";

export interface Product{
    id?: number;
    name?: string;
    subcategoryId?: Subcategory;
    brand?: Brand;
    image?: string | ArrayBuffer | null;
    price?: number;
}