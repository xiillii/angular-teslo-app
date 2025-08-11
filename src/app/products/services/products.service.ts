import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ListProductDto } from '@products/interfaces/list-product.dto';
import { ListProductResponse } from '@products/interfaces/list-product.response.interface';
import { ProductsMapper } from '@products/interfaces/products.mapper';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(): Observable<ListProductDto> {
    const response = this.http.get<ListProductResponse>(`${baseUrl}/products`);
    return response.pipe(map((res) => ProductsMapper.toListProductDto(res)));
  }
}
