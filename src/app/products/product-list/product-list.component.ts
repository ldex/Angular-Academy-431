import { Component, inject } from '@angular/core';
import { Product } from '../../types/product.interface';
import { AsyncPipe, CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, UpperCasePipe, AsyncPipe, SlicePipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  title: string = 'Products'

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  pageNumber = 1

  previousPage() {
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.selectedProduct = null
    this.pageNumber--
  }

  nextPage() {
    this.start += this.pageSize
    this.end += this.pageSize
    this.selectedProduct = null
    this.pageNumber++
  }

  currencyType = 'symbol-narrow'

  selectedProduct: Product

  errorMessage: string

  display(product: Product) {
    this.errorMessage = `You added ${product.name} to your favourites`
  }

  onSelect(product: Product) {
    this.selectedProduct = product
    this.router.navigateByUrl('products/' + product.id)
  }

  products$: Observable<Product[]> = this
                                        .productService
                                        .products$
                                        .pipe(
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
