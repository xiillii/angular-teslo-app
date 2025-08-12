import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ListProductDto } from '@products/interfaces/list-product.dto';
import { ListProductResponse } from '@products/interfaces/list-product.response.interface';
import { ProductsMapper } from '@products/interfaces/products.mapper';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ListProductDto> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const response = this.http.get<ListProductResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    });
    return response.pipe(
      map((res) => ProductsMapper.toListProductDto(res)),
      tap((res) => {
        console.log('Products fetched:', res);
      })
    );
  }
}
