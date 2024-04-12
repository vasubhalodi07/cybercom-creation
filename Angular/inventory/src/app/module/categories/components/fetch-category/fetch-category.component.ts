import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-fetch-category',
  templateUrl: './fetch-category.component.html',
  styleUrl: './fetch-category.component.css',
})
export class FetchCategoryComponent implements OnInit {
  categories: any;
  isLoading: boolean = false;
  id: any;

  showModal: string = '';
  categoryToDeleteId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.fetchCategories();
  }

  fetchCategories() {
    this.isLoading = true;
    this.categoryService.fetchCategories().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        this.categories = res;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  showDeleteModal(id: number) {
    this.categoryToDeleteId = id;
    this.showModal = 'block';
  }

  closeModal() {
    this.showModal = 'none';
  }

  confirmDelete() {
    if (this.categoryToDeleteId) {
      this.categoryService.deleteCategories(this.categoryToDeleteId).subscribe({
        next: (res) => {
          console.log(res);
          this.fetchCategories();
          this.closeModal();
          console.log('record deleted sucessfully');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  editNavigation(id: number) {
    console.log(id);
    this.router.navigate([`categories/update/${id}`]);
  }
}
