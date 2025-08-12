import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  imports: [],
  templateUrl: './product-carousel.component.html',
})
export class ProductCarouselComponent {
  images = input.required<string[] | null | undefined>();
}
