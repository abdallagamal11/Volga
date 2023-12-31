import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthHttpInterceptor } from './core/helpers/auth-http-interceptor';
import { ErrorInterceptor } from './core/helpers/error-interceptor';
import { HttpCoreInterceptor } from './core/helpers/http-core-interceptor';
import { LazyTranslateLoader } from './core/helpers/lazy-translate-loader';
import { LowerCaseUrlSerializerProvider } from './core/helpers/lowercase-url-serializer';
import { VgRouteReuseStrategy } from './core/helpers/vg-route-reuse-strategy';
import { AuthService } from './core/services/auth.service';
import { CultureService } from './core/services/culture.service';
import { LayoutModule } from './layout/layout.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		LayoutModule,
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
				useClass: HttpCoreInterceptor,
				multi: true
			},
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
			{ provide: RouteReuseStrategy, useClass: VgRouteReuseStrategy },
			AuthService,
			TranslateService,
			CultureService,
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