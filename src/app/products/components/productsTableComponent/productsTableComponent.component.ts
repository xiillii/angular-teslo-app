import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto } from '@products/interfaces/list-product.dto';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-products-table-component',
  imports: [CurrencyPipe, ProductImagePipe, RouterLink],
  templateUrl: './productsTableComponent.component.html',
})
export class ProductsTableComponentComponent {
  products = input.required<ProductDto[]>();
}
