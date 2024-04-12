import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { FormComponent } from '../../../../core/guard/form-check.guard';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent implements OnInit, FormComponent {
  categoryForm: FormGroup;
  categoryId: number | undefined;

  formLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchCategoryById(this.categoryId);
  }

  hasUnsavedChanges(): boolean {
    return this.categoryForm.dirty;
  }

  fetchCategoryById(categoryId: number) {
    this.categoryService.fetchCategoryById(categoryId).subscribe({
      next: (res: any) => {
        this.categoryForm.setValue({
          name: res.name,
          image: res.image,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let newCategory = {
        name: this.categoryForm.value.name,
        image: this.categoryForm.value.image,
      };

      this.formLoading = true;
      this.categoryService
        .updateCategories(this.categoryId, newCategory)
        .subscribe({
          next: (res) => {
            this.formLoading = false;
          },
          error: (err) => {
            this.formLoading = false;
          },
        });
    } else {
      console.log('Form is invalid!');
    }
  }
}
