import { Component, EventEmitter, Inject, inject, Input, Output } from '@angular/core';
import { Product } from '../../types/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private productService = inject(ProductService)

  product: Product

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe({
        next: () => {
          console.log('Product deleted successfully on the server')
          this.productService.resetCache()
          this.router.navigate(['/products'])
        },
        error: error => {
          console.error('Error deleting product:', error)
        }
      }
      )
  }

  constructor() {
    let id = this.activatedRoute.snapshot.params.id

    this
      .productService
      .getProductById(id)
      .subscribe(product => {
        this.product = product
      })
  }
}
