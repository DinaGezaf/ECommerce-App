import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { ApiService } from './generic.service';
import { IProduct } from '../Model/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl + '/Products';

  constructor(private apiService: ApiService<any>) {}
  getProducts(): any {
    return this.apiService.getAll(this.baseUrl);
  }
  getProduct(productCode: string): any {
    return this.apiService.getOne(
      `${this.baseUrl}/details?ProductCode=${productCode}`
    );
  }
  AddProduct(Item: IProduct): any {
    return this.apiService.create(this.baseUrl, Item);
  }
  DeleteProduct(productCode: string): any {
    return this.apiService.delete(
      `${this.baseUrl}/delete?ProductCode=${productCode}`
    );
  }
  updateProduct(productCode: string, item: any) {
    return this.apiService.update(
      `${this.baseUrl}/edit?ProductCode=${productCode}`,
      item
    );
  }
}
