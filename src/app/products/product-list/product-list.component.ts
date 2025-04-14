import { Component, inject } from '@angular/core';
import { Product } from '../../types/product.interface';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { ProductService } from '../../services/product.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, UpperCasePipe, ProductDetailComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private productService = inject(ProductService)

  title: string = 'Products'

  currencyType = 'symbol-narrow'

  selectedProduct: Product

  errorMessage: string

  display(product: Product) {
    this.errorMessage = `You added ${product.name} to your favourites`
  }

  onSelect(product: Product) {
    this.selectedProduct = product
  }

  products$: Observable<Product[]> = this
                                        .productService
                                        .products$
                                        .pipe(
                                          tap((products) => {
                                            console.log(products)
                                          }),
                                          catchError((error) => {
                                            this.errorMessage = 'Error loading products: ' + error.message
                                            return EMPTY;
                                          })
                                        )

  // constructor() {
  //   this.productService.products$.subscribe((products) => {
  //     next: (products) => {
  //       console.log(products)
  //     }
  //     error: (error) => {
  //       console.error(error)
  //     }
  //   }
  // }
}
