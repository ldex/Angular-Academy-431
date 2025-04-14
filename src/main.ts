import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ProductListComponent } from './app/products/product-list/product-list.component';

bootstrapApplication(ProductListComponent, appConfig)
  .catch((err) => console.error(err));
