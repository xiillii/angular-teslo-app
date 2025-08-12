import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto } from '@products/interfaces/list-product.dto';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<ProductDto>();

  imageUrl = computed(() => {
    console.log(this.product().images[0]);
    return `http://localhost:3000/api/files/product/${
      this.product().images[0]
    }`;
  });
}
