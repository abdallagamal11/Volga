import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';

const routes: Routes = [
	{ path: '', component: IndexComponent }
];

@NgModule({
	declarations: [
		IndexComponent,
		RecommendedProductsComponent
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		CarouselModule,
		SharedModule
	]
})
export class HomeModule { }
