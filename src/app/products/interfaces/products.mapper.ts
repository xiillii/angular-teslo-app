import {
  ListProductResponse,
  Product,
  Gender,
  Size,
} from './list-product.response.interface';
import {
  ListProductDto,
  ProductDto,
  GenderDto,
  SizeDto,
} from './list-product.dto';
import { AuthMapper } from '@auth/interfaces/auth.mapper';

export class ProductsMapper {
  static toProductDto(product: Product): ProductDto {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      slug: product.slug,
      stock: product.stock,
      sizes: product.sizes.map((size) => ProductsMapper.toSizeDto(size)),
      gender: ProductsMapper.toGenderDto(product.gender),
      tags: product.tags,
      images: product.images,
      user: AuthMapper.toUserDto(product.user),
    };
  }

  static toListProductDto(response: ListProductResponse): ListProductDto {
    return {
      count: response.count,
      pages: response.pages,
      products: response.products.map(this.toProductDto),
    };
  }

  static toSizeDto(size: Size): SizeDto {
    return SizeDto[size as keyof typeof SizeDto];
  }

  static toGenderDto(gender: Gender): GenderDto {
    return GenderDto[gender as unknown as keyof typeof GenderDto];
  }
}
