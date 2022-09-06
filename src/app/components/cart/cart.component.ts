import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {};
  email: string;

  constructor(private cartService: CartService) { 
    const user = JSON.parse(localStorage.getItem('user') as string);
    if(user != null){
      this.email = user.email;
    }
    this.getCarts();
  }

  ngOnInit(): void {
  }

  getCarts(){
    this.cartService.getCarts(this.email)
      .subscribe((res)=>{
        console.log(res);
        this.cart = res;
        console.log("Cart", this.cart.cartEntry);
      });  
  }
}


