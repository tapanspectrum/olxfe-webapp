import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { AuthService } from 'src/app/auth/services/auth.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    clientIp: any
    constructor(private service: SessionService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const excludedUrls = [
            'https://api.ipify.org',
            '/auth',
            '/auth/login',
        ];

        if (excludedUrls.some(url => req.url.includes(url))) {
            return next.handle(req);
        }
        // Get the auth token from the service.
        const authToken = this.service.getItem('access-token') || '';
        console.log('Auth Token', authToken);
        const clientIp = this.service.getItem('ip') || '';
        if (!authToken) {
            return next.handle(req); // still forward the request (without auth)
        } else {
            // Check if token is a non-empty string
            if (typeof authToken !== 'string' || !authToken.trim()) {
                console.warn('No valid Auth Token, redirecting to login...');
                this.router.navigate(['/']);
                return next.handle(req); // still forward the request (without auth)
            }
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            const authReq = req.clone({
                headers: req.headers
                    .set('Authorization', authToken)
                    // only set IP header if available
                    .set('X-Client-IP', clientIp || '')
            });

            // send cloned request with header to the next handler.
            return next.handle(authReq);
        }
    }
}