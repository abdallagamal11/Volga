import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/category-model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent
{
	public parentCategories: CategoryModel[] | undefined | null;
	numbers: number[] = Array(9).fill(5);

	private subscription!: Subscription;


	constructor(private categoryService: CategoryService)
	{
		this.fetchParentCategories();
	}

	fetchParentCategories()
	{
		this.subscription = this.categoryService.getParentCategories().subscribe((result) =>
		{
			if (result)
			{
				this.parentCategories = result;
			} else this.parentCategories = null;
		});
	}

	ngOnDestroy()
	{
		this.subscription.unsubscribe();
	}
}