import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profile: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem('id')!);
    this.fetchUserById(id);
  }

  fetchUserById(id: any) {
    this.authService.fetchUserById(id).subscribe({
      next: (res) => {
        this.profile = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
