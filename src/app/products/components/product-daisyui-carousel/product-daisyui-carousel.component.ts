import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-daisyui-carousel',
  imports: [],
  templateUrl: './product-daisyui-carousel.component.html',
})
export class ProductDaisyuiCarouselComponent {
  images = input.required<string[] | null | undefined>();
}
