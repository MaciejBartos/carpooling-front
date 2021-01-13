import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginControl: FormControl;
  passwordControl: FormControl;

  constructor(private authenticationService: AuthenticationService,
              private tokenStorage: TokenStorageService,
              private toastrService: ToastrService,
              private router: Router) {
    this.loginControl = new FormControl('', [
      Validators.maxLength(20),
      Validators.required
    ]);
    this.passwordControl = new FormControl('', [
      Validators.maxLength(20),
      Validators.required
    ]);
  }

  ngOnInit(): void {
  }

  signIn(): void {
    const signInRequest = {
      login: this.loginControl.value,
      password: this.passwordControl.value
    };
    this.authenticationService.authenticateUser(signInRequest).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUserLogin(data.login);
        this.tokenStorage.saveRoles(data.roles);
        this.tokenStorage.saveAccountId(data.id);
        this.toastrService.success('logged in');
        this.router.navigateByUrl('/');
      }, error => {
        if (error.error.error === 'Bad credentials') {
          this.toastrService.error('Wrong credentials');
        } else if (error.error.error === 'User is disabled') {
          this.toastrService.error('Your account has been disable, please contact with administrator');
        } else {
          this.toastrService.error('Something went wrong, please try again');
        }
      });

  }

}
