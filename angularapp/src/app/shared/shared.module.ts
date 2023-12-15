import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
	declarations: [
		ForbiddenComponent,
		ErrorNotFoundComponent,
		HeaderComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		AppRoutingModule
	],
	exports: [
		ForbiddenComponent,
		ErrorNotFoundComponent,
		HeaderComponent,
		FooterComponent
	]
})
export class SharedModule { }
