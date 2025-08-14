import { Component, input } from '@angular/core';
import { ProductDto } from '@products/interfaces/list-product.dto';
import { ProductSwiperCarouselComponent } from '@products/components/product-swiper-carousel/product-swiper-carousel.component';

@Component({
  selector: 'product-details',
  imports: [ProductSwiperCarouselComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  product = input.required<ProductDto>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
}
