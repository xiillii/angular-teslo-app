import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  productSlug = inject(ActivatedRoute).snapshot.params['idSlug'];

  productService = inject(ProductsService);

  productResource = rxResource({
    request: () => ({ id: this.productSlug }),
    loader: ({ request }) => {
      console.log('Fetching product with ID:', request.id);
      return this.productService.getProductById(request.id);
    },
  });
}
