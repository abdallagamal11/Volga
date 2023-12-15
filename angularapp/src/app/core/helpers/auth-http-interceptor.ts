import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: 'root'
})
export class AuthHttpInterceptor implements HttpInterceptor
{
	constructor(private authService: AuthService)
	{
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const token = this.authService.getToken();
		if (this.authService.isAuthenticated() && token != null)
		{
			const request = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
					charset: 'utf-8',
				}
			});

			return next.handle(request);
		}

		return next.handle(req);
	}

}
