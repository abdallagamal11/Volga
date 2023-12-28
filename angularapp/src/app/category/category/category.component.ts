import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/core/models/category-model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit
{
	id: number | undefined;
	childrenCategories: CategoryModel[] | undefined;

	constructor(private routedData: ActivatedRoute, private categoryService: CategoryService)
	{
	}

	ngOnInit(): void
	{
		this.routedData.params.subscribe(paramsData =>
		{
			this.id = paramsData['id'];
			if (this.id)
			{
				this.categoryService.getChildrenCategories(this.id).subscribe(result =>
				{
					if (result && result.length > 0) this.childrenCategories = result;
				});
			}
		});
	}

}
