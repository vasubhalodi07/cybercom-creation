import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  isAdmin() {
    const token = JSON.parse(localStorage.getItem('id')!);
    const role = JSON.parse(localStorage.getItem('role')!);
    return token && role === 'admin';
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}
