import { User } from "./user.model";

export interface Order{
    id: number;
    paymentType: string;
    deliveryAddress: string;
    invoiceAddress: string;
    userId: User;
    cartId: string;
}