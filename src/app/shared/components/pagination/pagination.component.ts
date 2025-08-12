import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  pages = input<number>(0);
  currentPage = input<number>(1);

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, index) => index + 1);
  });
}
