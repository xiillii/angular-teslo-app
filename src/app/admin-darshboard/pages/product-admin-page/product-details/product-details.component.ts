import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductDto } from '@products/interfaces/list-product.dto';
import { ProductSwiperCarouselComponent } from '@products/components/product-swiper-carousel/product-swiper-carousel.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form-utils';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { ProductDaisyuiCarouselComponent } from '@products/components/product-daisyui-carousel/product-daisyui-carousel.component';
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [
    ProductSwiperCarouselComponent,
    ReactiveFormsModule,
    FormErrorLabelComponent,
    ProductDaisyuiCarouselComponent,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<ProductDto>();
  private productService = inject(ProductsService);
  router = inject(Router);

  saveError = signal(false);
  saveSuccess = signal(false);

  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0.01)]],
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
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    const isValid = this.productForm.valid;

    this.productForm.markAllAsTouched();

    if (!isValid) {
      return;
    }

    const formValue = this.productForm.value;

    const productLike: Partial<ProductDto> = {
      ...(formValue as any),
      id: this.product().id,
      tags: formValue.tags
        ? formValue.tags
            .toLowerCase()
            .split(',')
            .map((tag) => tag.trim())
        : [],
    };

    if (this.product().id === 'new') {
      // Handle new product creation
      const product = await firstValueFrom(
        this.productService.createProduct(productLike)
      )
        .then((product) => {
          this.saveSuccess.set(true);
          setTimeout(() => {
            this.saveSuccess.set(false);
            this.saveError.set(false);
            this.router.navigate(['/admin/products', product!.id]);
          }, 5000);
        })
        .catch((error) => {
          console.error('Error creating product:', error);
          this.saveError.set(true);
          setTimeout(() => {
            this.saveError.set(false);
            this.saveSuccess.set(false);
          }, 5000);
        });

      return;
    }

    await firstValueFrom(this.productService.updateProduct(productLike))
      .then((product) => {
        this.saveSuccess.set(true);
        setTimeout(() => {
          this.saveSuccess.set(false);
          this.saveError.set(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        this.saveError.set(true);
        setTimeout(() => {
          this.saveError.set(false);
          this.saveSuccess.set(false);
        }, 5000);
      });
  }
}
