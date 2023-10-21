import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Core/Model/Product.model';
import { ProductService } from 'src/app/Core/Service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productCode: string;
  imagePath: any;
  productData: any;
  products: IProduct[] = [];
  categories: string[] = [
    'Accessories',
    'Chair',
    'Decoration',
    'Furniture',
    'Table',
  ];
  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    category: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required]),
    minimumQuantity: new FormControl(0, [Validators.required]),
    discountRate: new FormControl(0, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public router: Router
  ) {
    this.productCode = this.activatedRoute.snapshot.params['productCode'];
  }
  handleFileInput(event: Event): any {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      const fileName = selectedFile.name;
      console.log('File Name:', fileName);
      this.imagePath = fileName;
    }
  }
  ngOnInit(): void {
    if (this.productCode) {
      this.productService
        .getProduct(this.productCode)
        .subscribe((response: any) => {
          this.productData = response;
          this.productForm.setValue({
            name: this.productData.name,
            category: this.productData.category,
            imagePath: this.productData.imagePath,
            price: this.productData.price,
            minimumQuantity: this.productData.minimumQuantity,
            discountRate: this.productData.discountRate,
          });
        });
    }
  }
  loadProducts() {
    this.productService.getProducts().subscribe((response: IProduct[]) => {
      this.products = response;
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.productForm.value.imagePath = '/' + this.imagePath;
    this.productData = this.productForm.value;
    if (this.productCode) {
      this.productService
        .updateProduct(this.productCode, this.productData)
        .subscribe((response: any) => {
          this.productData = response;
        });

      this.router.navigate(['home/products']);
      this.loadProducts();
    } else if (this.productCode == '') {
      this.productService
        .AddProduct(this.productData)
        .subscribe((response: any) => {
          this.productData = response;
        });
      this.router.navigate(['home/products']);
      this.loadProducts();
    }
  }
}
