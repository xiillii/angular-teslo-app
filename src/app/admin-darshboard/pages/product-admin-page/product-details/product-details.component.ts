import { Component, inject, input, OnInit } from '@angular/core';
import { ProductDto } from '@products/interfaces/list-product.dto';
import { ProductSwiperCarouselComponent } from '@products/components/product-swiper-carousel/product-swiper-carousel.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'product-details',
  imports: [ProductSwiperCarouselComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<ProductDto>();

  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [['']],
    gender: [
      'unisex',
      [Validators.required, Validators.pattern(FormUtils.genderPattern)],
    ],
    tags: [''],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  private setFormValue(formLike: Partial<ProductDto>) {
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  onSubmit() {
    console.log('Form submitted:', this.productForm.value);
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
  }
}
