import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Layout1Module } from './shared/layouts/layout1/layout1.module';
import { AuthInterceptor } from './core/interceptors/http.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { SessionService } from './core/services/session.service';
import { AuthGuard } from './core/gaurds/auth.gaurd';
import { ToastrModule } from 'ngx-toastr';
import {
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import { msalConfig } from './add-config';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Layout2Module } from './shared/layouts/layout2/layout2.module';


export function initApp(sessionService: SessionService) {
  return async () => {
    try {
      const res = await sessionService.getClientIp();
      sessionService.setItem('ip', res?.ip);
    } catch (err) {
      console.error('Failed to fetch client IP:', err);
    }
  };
}

export function initializeMsal(msalService: MsalService) {
  return () => msalService.instance.initialize();
}

const msalInstance = new PublicClientApplication(msalConfig);

const guardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Popup,
  authRequest: {
    scopes: ['User.Read', 'User.ReadBasic.All', 'openid', 'profile', 'email', 'offline_access', 'User.Read.All'],
    // consentScopes: ['user.read', 'openid', 'profile'],
  },
};

const protectedResourceMap = new Map<string, Array<string>>();
protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['User.Read', 'User.ReadBasic.All', 'openid', 'profile', 'email', 'offline_access', 'User.Read.All']);

const interceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Popup,
  protectedResourceMap,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    MsalModule.forRoot(msalInstance, guardConfig, interceptorConfig),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    Layout1Module,
    Layout2Module,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [SessionService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      deps: [MsalService],
      multi: true,
    },
  ],
  exports: [Layout1Module, Layout2Module],
  bootstrap: [AppComponent],
})
export class AppModule { }
