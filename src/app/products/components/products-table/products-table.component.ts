import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto } from '@products/interfaces/list-product.dto';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-products-table',
  imports: [CurrencyPipe, ProductImagePipe, RouterLink],
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  products = input.required<ProductDto[]>();
}
