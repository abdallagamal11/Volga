import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/core/models/category-model';

@Component({
	selector: 'app-children-categories-card',
	templateUrl: './children-categories-card.component.html',
	styleUrls: ['./children-categories-card.component.css']
})
export class ChildrenCategoriesCardComponent
{
	@Input('category') category!: CategoryModel;
}
