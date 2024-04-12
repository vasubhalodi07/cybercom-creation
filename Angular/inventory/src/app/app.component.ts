import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  toastMessage: string = '';
  id: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  logout() {
    localStorage.removeItem('id');
    this.id = undefined;
    this.router.navigate(['/user/login']);
  }
}
