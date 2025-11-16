import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/shared/services/seo.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'tap-login',
  // templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponentCPY {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  loggedIn = false;
  username?: string;
  constructor(
    private seo: SeoService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private auth: AuthService,
    private loaderservice: LoaderService,
    private msalService: MsalService
  ) {
    this.seo.updateMeta(
      'Login - MyApp',
      'Login to access your account on MyApp.',
      'login, user access, myapp'
    );
    this.seo.setNoIndex(); // prevent indexing
  }

  ngOnInit() {
    this.msalService.instance.handleRedirectPromise().then((result) => {
      if (result !== null && result.account !== null) {
        this.msalService.instance.setActiveAccount(result.account);
        console.log('Login successful', result.account);
        this.checkAccount();
      }
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loaderservice.show();
    setTimeout(() => {
      this.loaderservice.hide();
    }, 3000);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loaderservice.show();
    this.auth
      .doLogin(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: (res) => {
          // Simulate a login HTTP request
          setTimeout(() => {
            this.loaderservice.hide();
            this.toaster.success('Login successful!');
          }, 2000);
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
          this.loaderservice.hide();
        },
      });
  }

  aadLogin() {
    console.log('Azure AD login initiated');
    // this.auth.aadLogin();
    console.log('Azure AD login initiated');
    this.msalService.loginRedirect({
      scopes: ['user.read', 'openid', 'profile', 'email'], // request scopes here
    });
  }

  logout() {
    this.msalService.logoutPopup({
      mainWindowRedirectUri: '/',
    });
  }

   checkAccount() {
    const account = this.msalService.instance.getActiveAccount();
    if (account) {
      console.log('Active account:', account.username);
    } else {
      console.log('No active account found');
    }
  }
}
