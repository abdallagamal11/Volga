import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		ForbiddenComponent,
		ErrorNotFoundComponent,
	],
	imports: [
		CommonModule,
		AppRoutingModule,
		TranslateModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		ForbiddenComponent,
		ErrorNotFoundComponent,
	]
})
export class LayoutModule { }
