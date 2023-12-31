import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../servicesAuth/user-auth.service";
import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userAuthservice: UserAuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone())
        }
        const token = this.userAuthservice.getToken();

    if(token){
         req = this.addToken(req, token);
    }
       
        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if (err.status === 401) {
                        this.router.navigate(['/signin']);
                    }
                     if (err.status === 403) {
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError("Something is wrong");
                }
            )
        );

    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

}