import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const DEFAULT_LANG = 'en-US';
export class LazyTranslateLoader implements TranslateLoader
{
	constructor(private http: HttpClient) { }

	getTranslation(lang: string): Observable<any>
	{
		return this.http
			.get(`/assets/i18n/${lang}.json`)
			.pipe(
				catchError(() => this.http.get(`/assets/i18n/${DEFAULT_LANG}.json`))
			);
	}
}