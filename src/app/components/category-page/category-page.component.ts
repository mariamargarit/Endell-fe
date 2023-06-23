import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AssignedValue } from 'src/app/models/assigned-value.model';
import { Category } from 'src/app/models/category.model';
import { ProductAttribute } from 'src/app/models/product-attribute.model';
import { Product } from 'src/app/models/product.model';
import { Variant } from 'src/app/models/variant.model';
import { AssignedValueService } from 'src/app/services/assigned-value.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductAttributeService } from 'src/app/services/product-attribute.service';
import { ProductService } from 'src/app/services/product.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  subcategoryId: number|null;
  categories: Category[];
  variants: Variant[] = [];
  productAttributes: ProductAttribute[];
  pageList: Variant[] = [];
  filterForm!: FormGroup;
  
  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private variantService: VariantService, private productAttributeService: ProductAttributeService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.subcategoryId = +param.get('subcategory')!;
    })
    this.getCategories();
    this.getVariantBySubcategory(this.subcategoryId);
    this.getProductAttributes();
    this.filterForm = this.fb.group({
      search: new FormControl(''),
      filterSize: new FormControl(''),
      filterColor: new FormControl(''),
    });
  }

  getCategories(){
    this.categoryService.getCategories()
    .subscribe((res)=>{
      this.categories = res;
    }, err => {
      console.log(err);})
  }

  getVariantBySubcategory(id: number| null){
    this.variantService.getVariantsBySubcategory(id)
    .subscribe((res) =>{
      console.log("res", res);
      this.variants = res;
      this.pageList = this.variants;
    }, err => {
      console.log(err);
    })
  }

  getProductAttributes(){
    this.productAttributeService.getProductAttributes()
    .subscribe((res) => {
      this.productAttributes = res;
    })
  }
  
  filterSet() {
    this.pageList = [];
    this.pageList = this.variants.filter((x: any) => {
      const { filterSize, filterColor } =
      this.filterForm.value;
      console.log("size", this.filterForm.value);
      x.assignedValueDTOList.forEach((element: any) => {
        console.log("pls", element.attributeValueId.val);
      });
      return (
        (filterSize && filterSize.length
          ? x.assignedValueDTOList.find((item: any) => filterSize.includes(item.attributeValueId.val))
          : true) &&
          (filterColor && filterColor.length
            ? x.assignedValueDTOList.find((item: any) => filterColor.includes(item.attributeValueId.val))
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
      filterSize: '',
      filterColor: ''
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.pageList = this.variants;
    }
  
    this.pageList = this.variants.filter(
      variant => variant?.productId?.name?.toLowerCase().includes(text.toLowerCase())
    );
  }

  navigate(id: number | undefined){
    this.router.navigate(["p", id]);
    }
}
