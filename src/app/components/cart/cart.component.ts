import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartEntryService } from 'src/app/services/cart-entry.service';

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
  stripePromise = loadStripe(environment.stripe);
  amount: number|undefined;

  constructor(private cartService: CartService, private http: HttpClient, private cartEntryService: CartEntryService) {
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

  deleteCartEntry(id:number|undefined){
    this.cartEntryService.deleteCartEntry(id).subscribe(
      (res) => {
        console.log(res);
        this.getCurrentCart();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  async pay(): Promise<void> {
    if(this.cart.totalPrice)
      this.amount = this.cart.totalPrice*100;
    const payment = {
      name: 'plata',
      currency: 'ron',
      amount: this.amount,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cart',
      successUrl: 'http://localhost:4200/checkout',
    };

    const stripe = await this.stripePromise;

    this.http
      .post(`http://localhost:8080/api/payment`, payment)
      .subscribe((data: any) => {
        stripe!.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
