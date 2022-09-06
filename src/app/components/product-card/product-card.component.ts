import { Component, Input, OnInit } from '@angular/core';
import { CartEntry } from 'src/app/models/cartEntry.model';
import { Variant } from 'src/app/models/variant.model';
import { CartEntryService } from 'src/app/services/cart-entry.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  variants: Variant[] = [];

  constructor(private variantService: VariantService, private cartEntryService: CartEntryService) { }

  ngOnInit(): void {
    this.getVariants();
  }

  getVariants(){
    this.variantService.getVariants()
      .subscribe((res)=>{
        console.log(res);
        for (let index = 0; index < res.length; index++) {
          this.variants.push({
            id: res[index].id,
            productId: res[index].productId,
            availableQuantity: res[index].availableQuantity,
            price: res[index].price,
            addedDate: res[index].addedDate,
            variantPicture: res[index].variantPicture
          });
        }
      })
  }

  createCartEntry(variant: Variant){
    const cartEntry: CartEntry = {quantity: 1, variantId: variant};

    this.cartEntryService
      .createCartEntry(cartEntry)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

}
