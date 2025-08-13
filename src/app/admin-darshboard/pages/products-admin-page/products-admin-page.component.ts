import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsTableComponentComponent } from '@products/components/productsTableComponent/productsTableComponent.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/services/pagination.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductsTableComponentComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) =>
      this.productService.getProducts({ offset: request.page * 10, limit: 10 }),
  });
}
