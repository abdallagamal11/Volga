import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { ProductModule } from '../product/product.module';
import { ListingModule } from '../listing/listing.module';

let routes: Routes = [{
	path: ':id', component: CategoryComponent
}];

@NgModule({
	declarations: [
		CategoryComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ProductModule,
		ListingModule
	]
})
export class CategoryModule { }
