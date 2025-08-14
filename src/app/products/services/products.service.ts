import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ListProductDto,
  ProductDto,
} from '@products/interfaces/list-product.dto';
import {
  ListProductResponse,
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
  private productCache = new Map<string, ProductDto>();

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

  getProductByIdSlug(idSlug: string): Observable<ProductDto | null> {
    const key = `#${idSlug}#`;
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    const response = this.http.get<ProductBySlugResponse>(
      `${baseUrl}/products/${idSlug}`
    );

    return response.pipe(
      map((res) => {
        const dataMapped = ProductsMapper.toProductBySlug(res);
        return dataMapped;
      }),
      tap((respDto) => {
        this.productCache.set(key, respDto);
      }),
      catchError((error) => {
        console.error('Error fetching product:', error);
        throw error;
      })
    );
  }

  getProductById(id: string): Observable<ProductDto | null> {
    const key = `#${id}#`;
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    const response = this.http.get<ProductBySlugResponse>(
      `${baseUrl}/products/${id}`
    );

    return response.pipe(
      map((res) => {
        const dataMapped = ProductsMapper.toProductBySlug(res);
        return dataMapped;
      }),
      tap((respDto) => {
        this.productCache.set(key, respDto);
      }),
      catchError((error) => {
        console.error('Error fetching product:', error);
        throw error;
      })
    );
  }

  updateProduct(
    productLike: Partial<ProductDto>
  ): Observable<ProductDto | null> {
    const key = `#${productLike.id}#`;

    const { id, ...updateData } = productLike;

    const response = this.http.patch<ProductBySlugResponse>(
      `${baseUrl}/products/${id}`,
      updateData
    );

    return response.pipe(
      map((res) => {
        const dataMapped = ProductsMapper.toProductBySlug(res);
        return dataMapped;
      }),
      tap((respDto) => {
        this.updateCache(respDto);
      }),
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      })
    );
  }
  private updateCache(product: ProductDto) {
    const key = `#${product.id}#`;
    this.productCache.set(key, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map((currentProd) =>
        currentProd.id == product.id ? product : currentProd
      );
    });
  }
}
