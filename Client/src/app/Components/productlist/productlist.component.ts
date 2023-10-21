import { AddProductComponent } from './../add-product/add-product.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from 'src/app/Core/Model/Product.model';
import { ProductService } from 'src/app/Core/Service/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  products: any;
  allProducts: any;
  active: string = 'all products';
  srcPro: any = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response;
    });
  }
  openEditor(product: any) {
    this.dialog.open(AddProductComponent, {
      data: product,
      height: '80vh',
      width: '70vw',
    });
  }

  onNew() {
    const product = {
      productCode: '',
      name: '',
      imagePath: '',
      category: '',
      price: 0,
      MinimumQuantity: 0,
      DiscountRate: 0,
    };
    this.openEditor(product);
  }
  @Input() product: IProduct = {
    productCode: '',
    name: '',
    imagePath: '',
    category: '',
    price: 0,
    minimumQuantity: 0,
    discountRate: 0,
  };

  handlerDeleteProduct(productCode: string) {
    this.productService
      .DeleteProduct(productCode)
      .subscribe((response: any) => {});
    this.products = this.products.filter((data: any) => {
      return data.productCode != productCode;
    });
  }

  getProductsData = (category: string) => {
    if (category === 'all products') {
      this.productService.getProducts().subscribe((response: any) => {
        this.products = response;
      });
      this.active = category;
    } else {
      this.allProducts = this.products;
      this.products = this.allProducts.filter(
        (product: any) => product.category === category
      );
      console.log(this.products);
      this.active = category;
    }
  };

  getProduct(productCode: string) {
    this.productService.getProduct(productCode);
  }
}
