import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ChildrenCategoriesCardComponent } from './children-categories-card/children-categories-card.component';
import { CardComponent } from './card/card.component';

@NgModule({
	declarations: [
		CardComponent,
		ChildrenCategoriesCardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule
	],
	exports: [
		ChildrenCategoriesCardComponent,
		CardComponent
	]
})
export class SharedModule { }
