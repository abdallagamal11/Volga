import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';

let routes: Routes = [
	{ path: ':id', component: ProductComponent }
];

@NgModule({
	declarations: [
		ProductComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [
	]
})
export class ProductModule { }
