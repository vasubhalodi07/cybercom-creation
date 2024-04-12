import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { FormComponent } from '../../../../core/guard/form-check.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements FormComponent {
  categoryForm: FormGroup;
  formLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  hasUnsavedChanges(): boolean {
    return this.categoryForm.dirty;
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let newCategory = {
        name: this.categoryForm.value.name,
        image: this.categoryForm.value.image,
      };

      this.formLoading = true;
      this.categoryService.addCategories(newCategory).subscribe({
        next: (res) => {
          this.formLoading = false;
          this.categoryForm.reset();
          this.router.navigate(['/categories']);
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
