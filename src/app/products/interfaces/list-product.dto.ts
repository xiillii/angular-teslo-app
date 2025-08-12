import { UserDto } from '@auth/interfaces/user.dto';

export interface ListProductDto {
  count: number;
  pages: number;
  products: ProductDto[];
}

export interface ProductDto {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: SizeDto[];
  gender: GenderDto;
  tags: string[];
  images: string[];
  user?: UserDto;
}

export enum GenderDto {
  Kid = 'kid',
  Men = 'men',
  Unisex = 'unisex',
  Women = 'women',
}

export enum SizeDto {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}
