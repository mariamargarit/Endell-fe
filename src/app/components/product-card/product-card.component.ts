import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Variant } from 'src/app/models/variant.model';
import { ProductService } from 'src/app/services/product.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  variantsNike: Variant[] = [];
  variantsAdidas: Variant[] = [];
  constructor(private router: Router,private variantService: VariantService) { }

  ngOnInit(): void {
    this.getVariantsByBrandName();
  }

  getVariantsByBrandName(){
    this.variantService.getVariantsByBrandName("Nike")
      .subscribe((res)=>{
        this.variantsNike = res
      })
    this.variantService.getVariantsByBrandName("Adidas")
      .subscribe((res)=>{
        this.variantsAdidas = res
      })
  }
  navigate(id: number | undefined){
    this.router.navigate(["p", id]);
    }
}
