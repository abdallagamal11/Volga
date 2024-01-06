import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ChildrenCategoriesCardComponent } from './children-categories-card/children-categories-card.component';
import { CardComponent } from './card/card.component';
import { CardsPlaceholderComponent } from './cards-placeholder/cards-placeholder.component';

@NgModule({
	declarations: [
		CardComponent,
		ChildrenCategoriesCardComponent,
		CardsPlaceholderComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule
	],
	exports: [
		ChildrenCategoriesCardComponent,
		CardComponent,
		CardsPlaceholderComponent
	]
})
export class SharedModule { }
