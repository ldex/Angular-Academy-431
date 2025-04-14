import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';
  private http = inject(HttpClient);

  products$: Observable<Product[]>

  constructor() {
    this.initProducts();
  }

  initProducts() {
    this.products$ = this.http.get<Product[]>(this.baseUrl);
  }
}
