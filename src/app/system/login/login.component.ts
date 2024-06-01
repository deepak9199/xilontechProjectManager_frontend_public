import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any
  password: any
  form: any = {};
  isLoggedIn: string;
  isLoginFailed = false;
  errorMessage = '';
  roles = '';
  returnUrl: string;
  submitted = false;
  role_data = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    
  ) { }

  ngOnInit(): void {
  
  }
  login() {


    this.submitted = true;


    this.authService.login(this.username,this.password)
      .pipe(first())
      .subscribe(
        data => {
          console.warn('data role login : ' + data);
          console.warn('data' + data.accessToken);
          this.router.navigate(['/projects'])
          .then(() => {
            window.location.reload();
          });
          // if (data.roles == 'ROLE_USER') {
          //   this.router.navigate(['/timeclock'])
          //     .then(() => {
          //       window.location.reload();
          //     });
          // }
          // else if (data.roles == 'ROLE_MODERATOR') {
          //   this.router.navigate(['/portal/moderator'])
          //     .then(() => {
          //       window.location.reload();
          //     });
          // }
          // else if (data.roles == 'ROLE_ADMIN') {
          //   this.router.navigate(['/portal/admin'])
          //     .then(() => {
          //       window.location.reload();

          //     });
          // }
          // else if (data.roles == 'ROLE_PARTNER') {
          //   this.router.navigate(['/portal/partner'])
          //     .then(() => {
          //       window.location.reload();
          //     });
          // }

        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    console.warn('deepal' + this.returnUrl);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
