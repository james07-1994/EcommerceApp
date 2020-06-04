import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(form) {
    this.as
      .login(form.value.email, form.value.password)
      .then((data) => {
        this.router.navigate(['/']);
      })

      .catch((err) => console.log(err));
  }
}
