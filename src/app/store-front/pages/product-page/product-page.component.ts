import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductSwiperCarouselComponent } from '@products/components/product-swiper-carousel/product-swiper-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductSwiperCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  productSlug = inject(ActivatedRoute).snapshot.params['idSlug'];

  productService = inject(ProductsService);

  productResource = rxResource({
    request: () => ({ id: this.productSlug }),
    loader: ({ request }) => {
      return this.productService.getProductById(request.id);
    },
  });
}
