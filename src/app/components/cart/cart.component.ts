import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = {};
  email: string;
  items: number = 0;
  totalPrice: number = 0;
  newQuantity: number = 0;

  constructor(private cartService: CartService) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user != null) {
      this.email = user.email;
    }
  }

  ngOnInit(): void {
    this.getCurrentCart();
  }

  getCurrentCart() {
    this.cartService.getCurrentCart(this.email).subscribe((res) => {
      console.log(res);
      this.cart = res;
      this.items=0;
      this.cart.cartEntry?.forEach((entry) => {
        if (entry.quantity != undefined)
          this.items = this.items + entry.quantity;
      });
      if (this.cart.totalPrice != undefined)
        this.totalPrice = this.cart.totalPrice + 20;
      console.log(this.cart.totalPrice);
    });
  }

  increaseQuantity(id: number | undefined, quantity: number | undefined) {
    if (quantity != undefined) this.newQuantity = quantity + 1;
    this.cartService.updateCartQuantity(id, this.newQuantity).subscribe(
      (res) => {
        console.log(res);
        this.getCurrentCart();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  decreaseQuantity(id: number | undefined, quantity: number | undefined) {
    if (quantity != undefined && quantity >= 2) {
      this.newQuantity = quantity - 1;
      this.cartService.updateCartQuantity(id, this.newQuantity).subscribe(
        (res) => {
          console.log(res);
          this.getCurrentCart();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
