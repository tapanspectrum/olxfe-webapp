import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toaster: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;

          // Optionally handle specific status codes
          switch (error.status) {
            case 400:
              console.warn('Bad Request', error);
              break;
            case 401:
              console.warn('Unauthorized', error);
              this.toaster.error(error.message || 'Login failed. Please try again.');
              this.router.navigate(['/']); // Redirect to login
              break;
            case 403:
              console.warn('Forbidden', error);
              break;
            case 404:
              console.warn('Not Found', error);
              break;
            case 500:
              console.error('Server Error', error);
              break;
            default:
              console.error('Unhandled error', error);
          }
        }

        // Optionally display a user-friendly message
        // alert(errorMessage);
        // this.toaster.error(errorMessage, 'Error', { timeOut: 5000 });

        return throwError(() => error);
      })
    );
  }
}
