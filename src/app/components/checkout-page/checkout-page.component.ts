import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  firstFormGroup = this.formBuilder.group({
    cityCtrl: ['', Validators.required],
    countryCtrl: ['', Validators.required],
    countyCtrl: ['', Validators.required],
    postalCodeCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  city: string;
  cartId: number | null;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private _snackBar: MatSnackBar
  ) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user != null) {
      this.id = user.id;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.cartId = +param.get('cart')!;
    });
  }

  sendOrder() {
    const address = new Address(
      this.firstFormGroup.value.addressCtrl,
      this.firstFormGroup.value.postalCodeCtrl,
      this.firstFormGroup.value.cityCtrl,
      this.firstFormGroup.value.countyCtrl,
      this.firstFormGroup.value.countryCtrl
    );
    const order = new Order('card', address, address, this.id, this.cartId);
    this.orderService
      .createOrder(order)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this._snackBar.open("Ati finalizat comanda cu succes!", "Ok", {
        duration: 2000,
      });
  }
}
