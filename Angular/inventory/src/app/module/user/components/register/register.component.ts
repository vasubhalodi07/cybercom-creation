import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { FormComponent } from '../../../../core/guard/form-check.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements FormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [''],
    });
  }

  hasUnsavedChanges(): boolean {
    return this.registerForm.dirty;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let newUser = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        avatar: this.registerForm.value.avatar,
      };

      console.log(newUser);

      this.authService.createUser(newUser).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Form is invalid!');
    }
  }
}
