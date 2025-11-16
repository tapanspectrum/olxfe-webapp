import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/shared/services/seo.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'tap-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl = '/';

  private readonly aadScopes = [
    'User.Read',
    'User.ReadBasic.All',
    'openid',
    'profile',
    'email',
    'offline_access',
    'User.Read.All',
  ];
  constructor(public activeModal: NgbActiveModal, private seo: SeoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private loaderService: LoaderService,
    private msalService: MsalService,
    private router: Router,
    private route: ActivatedRoute,
    private userContext: UserContextService) {}

  ngOnInit() {
    // Initialize form first
    this.initForm();

    // Then handle everything else
    const user = this.userContext.user$.getValue();
    if (user) {
      this.router.navigate(['/apps/dashboard']);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      const paramUrl = params['returnUrl'] || '/';
      if (paramUrl !== '/' && paramUrl !== '/auth/login') {
        this.returnUrl = paramUrl;
      }
    });

    this.handleMsalRedirect();
    this.loaderService.show();
    setTimeout(() => this.loaderService.hide(), 1200);
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  private async handleMsalRedirect() {
    try {
      const result = await this.msalService.instance.handleRedirectPromise();
      if (result?.account) {
        this.msalService.instance.setActiveAccount(result.account);
        this.processAADAccount(result.account);
      }
    } catch (error) {
      console.error('MSAL redirect handling error:', error);
    }
  }

  // ---- Manual Login ----
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.loaderService.show();

    this.auth.doLogin(email, password).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.handleLoginSuccess(res?.data?.user);
      },
      error: (err) => {
        this.error = err;
        this.loaderService.hide();
        this.toastr.error('Invalid credentials. Please try again.');
      },
    });
  }

  // ---- Azure AD Login ----
  async aadLogin() {
    console.log('Azure AD login initiated');
    try {
      const accounts = this.msalService.instance.getAllAccounts();

      if (accounts.length === 0) {
        // Start login redirect if no account exists
        await this.msalService.loginRedirect({ scopes: this.aadScopes });
        return;
      }

      // Already logged in, silently acquire token
      const result = await this.msalService.acquireTokenSilent({
        account: accounts[0],
        scopes: this.aadScopes,
      });

      console.log('AAD Token acquired:', result);
      this.processAADAccount(accounts[0]);
    } catch (err) {
      console.error('Azure AD login error:', err);
      this.toastr.error('Azure AD login failed. Please try again.');
    }
  }

  logout() {
    this.msalService.logoutPopup({ mainWindowRedirectUri: '/' });
    this.userContext.logout();
  }

  // ---- Common AAD Post-Login Handler ----
  private processAADAccount(account: AccountInfo) {
    if (!account) {
      console.warn('No active Azure AD account found.');
      return;
    }

    const email =
      account.idTokenClaims?.preferred_username ||
      account.idTokenClaims?.['email'] ||
      account.username;

    const userData = {
      name: account.name,
      email,
      username: account.username,
      aadId: account.localAccountId,
    };

    console.log('AAD User Info:', userData);

    this.auth.authorize(email).subscribe({
      next: (res) => this.handleLoginSuccess(res?.data?.user, userData),
      error: (err) => {
        console.error('Authorization error', err);
        this.toastr.error('Authorization failed. Contact admin.');
      },
    });
  }

  // ---- Unified Success Handler ----
  private handleLoginSuccess(user: any, aadInfo?: any) {
    console.log('Login successful for user:', this.returnUrl);
    this.userContext.setUser(user);
    const displayName = user?.name || aadInfo?.name || user?.email;
    this.toastr.success(`Welcome, ${displayName}!`);
    this.router.navigateByUrl(this.returnUrl || '/apps/dashboard');
  }

  close() {
    this.activeModal.close();
  }
}