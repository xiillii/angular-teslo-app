import { Component, input } from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-product-daisyui-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-daisyui-carousel.component.html',
})
export class ProductDaisyuiCarouselComponent {
  images = input.required<string[] | null | undefined>();
}
