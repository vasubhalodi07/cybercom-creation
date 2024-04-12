import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      this.authService.fetchUser().subscribe({
        next: (res: any) => {
          console.log(res);
          let findUser = res.find(
            (user: any) => user.email === email && user.password === password
          );
          console.log(findUser);
          if (findUser) {
            localStorage.setItem('id', JSON.stringify(findUser.id));
            this.router.navigate(['/product']);
          } else {
            console.log('user not found!');
          }
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
