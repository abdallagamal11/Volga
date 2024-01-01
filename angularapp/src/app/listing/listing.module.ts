import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListingComponent } from './listing.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListingComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    ListingComponent
  ]
})
export class ListingModule { }
