import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  userId: number | null;
  carts: Cart[];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.userId = +param.get('user')!;
    });
    this.getAllOrders();
  }

  getAllOrders() {
    this.cartService.getAllCartsForUser(this.userId).subscribe((res) => {
      this.carts = res;
      console.log("res",res);
    });
  }
}
