import { ProductService } from 'src/app/Core/Service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  allProducts: any;
  products: any;
  active: string = 'all products';
  srcPro: any = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe((response: any) => {
      this.allProducts = Object.values(response);
      this.products = this.allProducts;
    });
  }

  getProductsData = (category: string) => {
    if (category == 'all products') {
      this.products = this.allProducts;
      this.active = category;
    } else {
      let ispositive = (element: any, index: any, array: any) => {
        return element.categories == category;
      };
      this.srcPro[0] = this.allProducts[0].filter(ispositive);
      this.products = this.srcPro;
      this.active = category;
    }
  };

  getProduct(productCode: string) {
    this.productService.getProduct(productCode);
  }
}
