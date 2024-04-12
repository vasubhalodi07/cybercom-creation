import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { FormComponent } from '../../../../core/guard/form-check.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements FormComponent {
  userForm: FormGroup;

  formLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  hasUnsavedChanges(): boolean {
    return this.userForm.dirty;
  }

  onSubmit() {
    if (this.userForm.valid) {
      let newUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        avatar: this.userForm.value.avatar,
      };

      this.formLoading = true;
      this.userService.createUser(newUser).subscribe({
        next: (req) => {
          this.formLoading = false;
          this.userForm.reset();
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.formLoading = false;
        },
      });
    }
  }
}
