import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  isUser = false;

  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.as.user.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.as.userId = user.uid;
        // console.log(this.isUser);
      } else {
        this.isUser = false;
        this.as.userId = '';
        // console.log(this.isUser);
      }
    });
  }

  toggleNavBar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    // console.log('hello from logout');
    this.as.logout();
    this.router.navigate(['/login']);
  }
}
