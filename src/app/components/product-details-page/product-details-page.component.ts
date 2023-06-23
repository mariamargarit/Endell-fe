import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartEntry } from 'src/app/models/cartEntry.model';
import { Variant } from 'src/app/models/variant.model';
import { CartEntryService } from 'src/app/services/cart-entry.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css'],
})
export class ProductDetailsPageComponent implements OnInit {
  variant: Variant;
  variantId: number;
  sortedValues: (string | undefined)[] | undefined = [];
  quantity: number;
  size: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private variantService: VariantService,
    private cartEntryService: CartEntryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.variantId = +param.get('product')!;
    });
    this.getVariant(this.variantId);
    this.quantity = 1;
    this.size = undefined;
  }

  getVariant(id: number) {
    this.variantService.getVariant(id).subscribe((res) => {
      this.variant = res;
      this.variant.assignedValueDTOList?.sort((a, b) =>
        a.attributeValueId?.val.localeCompare(b.attributeValueId.val)
      );
    });
  }

  increase(): void {
    this.quantity = this.quantity + 1;
  }
  decrease(): void {
    if (this.quantity >= 2) this.quantity = this.quantity - 1;
  }
  setSize(size: string) {
    this.size = size;
  }
  addToCart(variant: Variant, quantity: number, size: string | undefined) {
    if (size != undefined) {
      const cartEntry: CartEntry = {
        quantity: quantity,
        variantId: variant,
        selectedSize: size,
      };
      this.cartEntryService.createCartEntry(cartEntry).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this._snackBar.open("Ati adaugat un produs in cos", "Ok", {
        duration: 2000,
      });
    }
    else {
      this._snackBar.open("Alegeti o marime", "Ok", {
        duration: 2000,
      });
    }
  }
}
