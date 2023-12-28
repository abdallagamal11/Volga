import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ChildrenCategoriesCardComponent } from './children-categories-card/children-categories-card.component';

@NgModule({
	declarations: [

		ChildrenCategoriesCardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule
	],
	exports: [
		ChildrenCategoriesCardComponent
	]
})
export class SharedModule { }
