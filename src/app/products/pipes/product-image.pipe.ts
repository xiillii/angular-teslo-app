import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[] | null | undefined): string {
    // If value is falsy, return fallback image
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return './assets/images/no-image.jpg';
    }

    // If value is an array, use the first image
    let image = Array.isArray(value) ? value[0] : value;

    // If image is already an absolute URL, return as is
    if (
      typeof image === 'string' &&
      (image.startsWith('http://') || image.startsWith('https://'))
    ) {
      return image;
    }

    // Otherwise, build the full URL
    return `${baseUrl}/files/product/${image}`;
  }
}
