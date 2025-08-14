import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  router = inject(Router);

  pageSize = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.pageSize(),
    }),
    loader: ({ request }) =>
      this.productService.getProducts({
        offset: request.page * this.pageSize(),
        limit: request.limit,
      }),
  });

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.router.navigate(['admin/products'], { queryParams: { page: 1 } });
  }
}
