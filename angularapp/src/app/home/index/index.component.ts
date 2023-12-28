import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/core/models/category-model';
import { ProductModel } from 'src/app/core/models/product-model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit
{
	public parentCategories: CategoryModel[] | null = null;
	numbers: number[] = Array(9).fill(5);

	constructor(private categoryService: CategoryService)
	{
	}

	ngOnInit()
	{
		this.fetchParentCategories();
	}

	fetchParentCategories()
	{
		this.categoryService.getParentCategories().subscribe((result) =>
		{
			if (result)
			{
				this.parentCategories = result;
			}
		});
	}
}