import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { Variant } from 'src/app/models/variant.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.css']
})
export class BrandPageComponent implements OnInit {

  brandId: number|null;
  categories: Category[];
  subcategories: Subcategory[];
  variants: Variant[] = [];
  pageList: Variant[] = [];
  filterForm!: FormGroup;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private variantService: VariantService, private fb: FormBuilder, private subcategoryService: SubcategoryService, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.brandId = +param.get('brand')!;
    })
    this.getCategories();
    this.getSubcategories();
    this.getVariantsByBrand(this.brandId);
    this.filterForm = this.fb.group({
      search: new FormControl(''),
      filterSubcategory: new FormControl('')
    });
  }

  getCategories(){
    this.categoryService.getCategories()
    .subscribe((res)=>{
      this.categories = res;
    }, err => {
      console.log(err);})
  }

  getSubcategories(){
    this.subcategoryService.getSubcategories()
    .subscribe((res)=>{
      this.subcategories = res;
    }, err => {
      console.log(err);})
  }

  getVariantsByBrand(id: number| null){
    this.variantService.getVariantsByBrand(id)
    .subscribe((res) =>{
      console.log("res", res);
      this.variants = res;
      this.pageList = this.variants;
    }, err => {
      console.log(err);
    })
  }

  filterSet() {
    this.pageList = [];
    this.pageList = this.variants.filter((x: any) => {
      console.log("size", x);
      const { filterSubcategory } =
      this.filterForm.value;
      return (
        (filterSubcategory && filterSubcategory.length
          ? filterSubcategory.includes(x.productId.subcategoryId.name)
          : true)
      );
    });
    console.log("pageList",this.pageList);
  }
  clearFilters() {
    // this.dataSource.filter = '';
    this.pageList = this.variants;
    this.filterForm.patchValue({
      search: '',
      filterSubcategory: ''
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.pageList = this.variants;
    }
  
    this.pageList = this.variants.filter(
      variants => variants?.productId?.name?.toLowerCase().includes(text.toLowerCase())
    );
  }

  navigate(id: number | undefined){
    this.router.navigate(["p", id]);
    }
}
