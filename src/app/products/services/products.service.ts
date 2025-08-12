import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ListProductDto,
  ProductDto,
} from '@products/interfaces/list-product.dto';
import {
  ListProductResponse,
  Product,
  ProductBySlugResponse,
} from '@products/interfaces/list-product.response.interface';
import { ProductsMapper } from '@products/interfaces/products.mapper';
import { catchError, map, Observable, of, tap } from 'rxjs';
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
  private productsCache = new Map<string, ListProductDto>();

  getProducts(options: Options): Observable<ListProductDto> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `#${gender}-${offset}-${limit}#`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    const response = this.http.get<ListProductResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    });
    return response.pipe(
      map((res) => ProductsMapper.toListProductDto(res)),
      tap((respDto) => {
        this.productsCache.set(key, respDto);
      })
    );
  }

  getProductById(id: string): Observable<ProductDto | null> {
    const response = this.http.get<ProductBySlugResponse>(
      `${baseUrl}/products/${id}`
    );

    return response.pipe(
      map((res) => {
        const dataMapped = ProductsMapper.toProductBySlug(res);
        return dataMapped;
      }),
      catchError((error) => {
        console.error('Error fetching product:', error);
        return of(null);
      })
    );
  }
}
