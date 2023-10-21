import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/Core/Service/product.service';
import { IProduct } from 'src/app/Core/Model/Product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.productCode = this.activatedRoute.snapshot.params['productCode'];
  }
  product: any;
  productCode: any;

  ngOnInit(): void {
    this.productService
      .getProduct(this.productCode)
      .subscribe((response: any) => {
        this.product = response;
      });
  }

  Back() {
    let role = localStorage.getItem('role');
    if (role == 'Admin') {
      this.router.navigate(['home/products']);
    } else if (role == 'User') {
      this.router.navigate(['products']);
    }
  }
}
