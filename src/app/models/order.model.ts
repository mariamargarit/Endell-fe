import { Address } from "./address.model";

export class Order{
    id?: number;
    paymentType: string;
    deliveryAddress: Address;
    invoiceAddress: Address;
    userId: number;
    cartId: number|null;
    constructor(paymentType: string, deliveryAddress: Address, invoiceAddress: Address,userId: number,cartId: number|null){
        this.paymentType = paymentType;
        this.deliveryAddress = deliveryAddress;
        this.invoiceAddress = invoiceAddress;
        this.userId = userId;
        this.cartId = cartId;
    }
}