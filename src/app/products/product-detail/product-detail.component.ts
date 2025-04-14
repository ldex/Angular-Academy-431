import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() product: Product

  @Output() addedToFavourites = new EventEmitter<Product>()

  addFavourites() {
    this.addedToFavourites.emit(this.product)
  }

}
