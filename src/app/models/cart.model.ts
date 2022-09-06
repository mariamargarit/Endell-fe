import { CartEntry } from "./cartEntry.model";

export interface Cart {
    id?: number;
    totalPrice?: number;
    valid?: boolean;
    cartEntry?: CartEntry[];
}