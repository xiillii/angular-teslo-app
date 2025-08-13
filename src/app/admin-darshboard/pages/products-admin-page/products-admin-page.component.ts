import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsTableComponentComponent } from '@products/components/productsTableComponent/productsTableComponent.component';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductsTableComponentComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productService = inject(ProductsService);

  productsResource = rxResource({
    loader: () => this.productService.getProducts({}),
  });
}
