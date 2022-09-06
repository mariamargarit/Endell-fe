import { NumberValueAccessor } from "@angular/forms";
import { Variant } from "./variant.model";

export interface CartEntry {
    id?: number;
    quantity?: number;
    pricePerPiece?: number;
    totalPricePerEntry?: number;
    variantId?: Variant;
}