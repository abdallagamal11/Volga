import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor
{
	constructor(private router: Router) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		return next.handle(req).pipe(catchError(err =>
		{
			if (err.status === 403) this.handleForbidden();
			//			if (err.status === 404) this.handleNotFound();
			if (err.status === 401) this.handleUnauthorized();
			const error = err;
			return throwError(() => error);
		}));
	}

	handleForbidden(): void
	{
		this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
	}
	handleNotFound(): void
	{
		this.router.navigate(['/404'], { queryParams: { returnUrl: this.router.url }, skipLocationChange: true });
	}
	handleUnauthorized(): void
	{
		this.router.navigate(['/account', 'login'], { queryParams: { returnUrl: this.router.url } });
	}
}