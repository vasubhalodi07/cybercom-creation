import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormComponent } from '../../../../core/guard/form-check.guard';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit, FormComponent {
  userForm: FormGroup;
  userId: number | undefined;

  formLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [''],
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchUserById(this.userId);
  }

  hasUnsavedChanges(): boolean {
    return this.userForm.dirty;
  }

  fetchUserById(id: number) {
    this.authService.fetchUserById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userForm.patchValue({
          name: res.name,
          email: res.email,
          password: res.password,
          avatar: res.avatar,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let updatedUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        avatar: this.userForm.value.avatar,
      };

      this.formLoading = true;
      this.authService.updateUser(this.userId, updatedUser).subscribe({
        next: (res: any) => {
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
