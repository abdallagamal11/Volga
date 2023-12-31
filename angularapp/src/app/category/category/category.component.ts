import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductSort } from 'src/app/core/enums/productSort';
import { CategoryModel } from 'src/app/core/models/category-model';
import { PaginationModel } from 'src/app/core/models/pagination-model';
import { ProductListPageModel } from 'src/app/core/models/product-list-page-model';
import { ProductListingFiltersModel } from 'src/app/core/models/product-listing-filters';
import { ProductModel } from 'src/app/core/models/product-model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { PartOf } from 'src/app/core/types/part-of';
import { environment } from 'src/app/environment';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy
{
	id: number | undefined;
	page: number | undefined;
	sort: ProductSort | undefined;
	childrenCategories: CategoryModel[] | undefined;
	products: ProductModel[] | undefined;
	paginationData: PaginationModel | undefined;
	totalPages: number = 0;
	totalRecords: number = 0;
	parametersObservable: Subscription | undefined;
	filters: PartOf<ProductListingFiltersModel> | undefined;
	pagination: PaginationModel | undefined;
	sellers: object | undefined;

	constructor(private routedData: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService)
	{
	}

	ngOnInit(): void
	{
		this.parametersObservable = this.routedData.params.subscribe(paramsData =>
		{
			this.id = paramsData['id'];
			this.sort = paramsData['sort'];
			this.page = paramsData['page'];

			this.getProductsData();
		});
	}

	getProductsData()
	{
		if (this.id)
		{
			this.categoryService.getChildrenCategories(this.id).subscribe(result =>
			{
				console.log(result);

				if (result && result.length > 0) this.childrenCategories = result;
			});

			if (!this.sort) this.sort = ProductSort.Popularity;
			if (!this.page) this.page = 1;
			this.productService.getPagedProductsByCategory(this.id, this.page, this.sort, this.filters)
				.subscribe(result =>
				{
					// console.log(result);
					if (result)
					{
						this.products = result.data;
						this.pagination = result.pagination;
						this.sellers = result.sellers;
					}
				});
		}
	}

	applyFilter(value: PartOf<ProductListingFiltersModel>)
	{
		this.filters = value;
		this.page = 1;
		this.getProductsData();
	}
	changePage(value: number)
	{
		this.page = value;
		this.getProductsData();
	}

	ngOnDestroy()
	{
		this.parametersObservable?.unsubscribe();
	}
}