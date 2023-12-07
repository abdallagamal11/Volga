import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppModule } from '../app.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { RouterLink } from '@angular/router';
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
