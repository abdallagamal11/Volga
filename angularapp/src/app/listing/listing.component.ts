import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductModel } from '../core/models/product-model';
import { CategoryModel } from '../core/models/category-model';
import { CategoryService } from '../core/services/category.service';
import { IForm } from '../core/types/vg-form-group';
import { ProductListingFiltersModel } from '../core/models/product-listing-filters';
import { PartOf } from '../core/types/part-of';
import { ProductListPageModel } from '../core/models/product-list-page-model';
import { environment } from '../environment';
import { PaginationModel } from '../core/models/pagination-model';

@Component({
	selector: 'app-listing',
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, OnChanges
{
	@Input() products: ProductModel[] | undefined;
	totalPages: number = 0;
	totalRecords: number = 0;
	category: CategoryModel | undefined;
	filtersDefault: IForm<ProductListingFiltersModel>;
	data: ProductListPageModel | undefined;
	filters: PartOf<ProductListingFiltersModel> | undefined;
	@Input() pagination: PaginationModel | undefined;
	@Input() sellers: object | undefined;
	@Input() page: number = 1;
	@Input() categoryId: number | undefined;
	@Output() filterApplyEvent = new EventEmitter<object>();
	@Output() PageApplyEvent = new EventEmitter<number>();
	sellerList: [string, string][] | undefined;
	pageSize: number;
	pageList: number[] = [];

	constructor(private categoryService: CategoryService)
	{
		this.pageSize = environment.productList.pagination.pageSize;
		this.filtersDefault = {
			discount: { showOnlyDiscountedItems: [false] },
			price: {
				start: null,
				end: null
			},
			rating: { showWithRating: undefined },
			seller: { sellers: [] },
			stock: { includeOutOfStock: false }
		};

		this.filters = {};
	}

	ngOnInit(): void
	{
	}


	ngOnChanges(changes: SimpleChanges): void
	{
		if (changes['products'])
		{
			this.totalRecords = this.pagination?.totalRecords ?? 0;

			this.totalPages = Math.ceil(this.totalRecords / environment.productList.productsPerPage);
			if (this.sellers)
			{
				this.sellerList = Object.entries(this.sellers);
			}
			this.setPagination();
		}

		if (changes['categoryId'])
			if (this.categoryId && !isNaN(this.categoryId))
				this.categoryService.getCategoryWithChildren(this.categoryId).subscribe(result =>
				{
					if (result && result.id !== undefined)
					{
						this.category = result;
					}
				});
	}

	setPagination()
	{
		let start = Math.max(1, this.page - this.pageSize);
		let end = Math.min(this.totalPages, start + this.pageSize * 2);

		this.pageList = Array.from({ length: end - start + 1 }, (_, index) => start + index);
	}

	changePage(page: number)
	{
		this.PageApplyEvent.emit(page);
	}
	nextPage()
	{
		this.changePage(Math.min(this.totalPages, this.page + 1));
	}
	prevPage()
	{
		this.changePage(Math.max(1, this.page - 1));
	}
	applyFilter(value: object)
	{
		this.filters = { ...this.filters, ...value };
		this.filterApplyEvent.emit(this.filters);
	}
}
