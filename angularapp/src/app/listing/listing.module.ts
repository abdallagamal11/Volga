import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ProductModule } from '../product/product.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    ListingComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ProductModule,
    ReactiveFormsModule
  ],
  exports: [
    ListingComponent
  ]
})
export class ListingModule { }
