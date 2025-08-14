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
  kid = 'kid',
  men = 'men',
  unisex = 'unisex',
  women = 'women',
}

export enum SizeDto {
  L = 'L',
  M = 'M',
  S = 'S',
  XL = 'XL',
  XS = 'XS',
  XXL = 'XXL',
}
