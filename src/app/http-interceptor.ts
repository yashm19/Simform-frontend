import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiserviceService } from "./apiservice.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private apiService: ApiserviceService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'token=' + this.apiService.getToken('token'))
        })
        return next.handle(authRequest)
    }

}