import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrl: './fetch-user.component.css',
})
export class FetchUserComponent implements OnInit {
  users: any;
  id: any;
  isLoading: boolean = false;

  showModal: string = '';
  userToDeleteId: number | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.authService.fetchUser().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.users = res;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  showDeleteModal(id: number) {
    this.userToDeleteId = id;
    this.showModal = 'block';
  }

  closeModal() {
    this.showModal = 'none';
  }

  confirmDelete() {
    if (this.userToDeleteId) {
      this.authService.deleteUser(this.userToDeleteId).subscribe({
        next: (res) => {
          console.log(res);
          this.fetchUsers();
          this.closeModal();
          console.log('record deleted sucessfully');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  updateNavigation(id: number) {
    this.router.navigate([`/user/update/${id}`]);
  }
}
