import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from '../product/product.module';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';
import { CarouselModule } from '../shared/carousel/carousel.module';
import { SharedModule } from '../shared/shared.module';

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
