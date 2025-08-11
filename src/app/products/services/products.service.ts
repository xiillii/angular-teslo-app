import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ListProductDto } from '@products/interfaces/list-product.dto';
import { ListProductResponse } from '@products/interfaces/list-product.response.interface';
import { ProductsMapper } from '@products/interfaces/products.mapper';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  getProducts(): Observable<ListProductDto> {
    const response = this.http.get<ListProductResponse>(
      `${this.baseUrl}/products`
    );
    return response.pipe(map((res) => ProductsMapper.toListProductDto(res)));
  }
}
