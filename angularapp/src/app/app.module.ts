import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './core/helpers/error-interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyTranslateLoader } from './core/helpers/lazy-translate-loader';
import { AuthHttpInterceptor } from './core/helpers/auth-http-interceptor';
import { LowerCaseUrlSerializerProvider } from './core/helpers/lowercase-url-serializer';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		CoreModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: LazyTranslateLoader,
				//useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
	],
	providers: [
		[
			LowerCaseUrlSerializerProvider,
			{
				provide: HTTP_INTERCEPTORS,
				useClass: ErrorInterceptor,
				multi: true
			},
			{
				provide: HTTP_INTERCEPTORS,
				useClass: AuthHttpInterceptor,
				multi: true
			},
		]
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader
{
	return new TranslateHttpLoader(http);
}