import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { environment } from 'src/app/environment';
import { ProductSort } from '../enums/productSort';
import { PagedDataModel } from '../models/paged-data-model';
import { ProductListingFiltersModel } from '../models/product-listing-filters';
import { PartOf } from '../types/part-of';
import { ProductListPageModel } from '../models/product-list-page-model';

@Injectable({
	providedIn: 'root'
})
export class ProductService
{
	constructor(private http: HttpClient) { }

	getFeaturedProducts(): Observable<ProductModel[] | null>
	{
		return this.http.get<ProductModel[] | null>(environment.apiUrl + '/product/recommended').pipe(
			map(result =>
			{
				if (result != null)
					result.map(item =>
					{
						item.priceAfterDiscount = 0;
						if (item.discount > 0)
						{
							item.priceAfterDiscount = item.price * (1 - item.discount / 100);
						}
						item.rating = this.calcRating(item.ratingCount, item.ratingSum);
						item.ratingStars = this.roundRatingForStars(item.rating);
					});

				return result;
			}),
			catchError(error => throwError(() => error))
		);
	}

	calcRating(ratingCount: number, ratingSum: number): number
	{
		if (ratingSum == 0 || ratingCount == 0) return 0;
		return parseFloat((ratingSum / ratingCount).toFixed(2));
	}

	roundRatingForStars(rating: number): number
	{
		if (isNaN(rating)) new Error('Wrong rating input!');
		if (Number.isInteger(rating)) return rating;

		rating = parseFloat(rating.toFixed(1));
		const integerPart: number = Math.floor(rating);
		const decimalPart: number = parseFloat((rating - integerPart).toFixed(1));

		if ([0.1, 0.2].includes(decimalPart)) return integerPart;
		if ([0.8, 0.9].includes(decimalPart)) return Math.ceil(rating);

		if ([0.3, 0.4, 0.6, 0.7].includes(decimalPart)) return integerPart + 0.5;
		return rating;
	}

	getPagedProductsByCategory(categoryId: number, page: number = 1, sort: ProductSort = ProductSort.Default, filters: PartOf<ProductListingFiltersModel> | null | undefined = null): Observable<ProductListPageModel | null>
	{
		if (!categoryId) return of(null);
		if (!page) page = 1;
		let take: number = environment.productList.productsPerPage;
		let skip: number = ((page - 1) * environment.productList.productsPerPage);
		// page = 2;
		// take = 1;
		// skip = 1;

		let params = {
			sort: sort,
			take: take,
			skip: skip
		};

		return this.http.post<ProductListPageModel | null>(environment.apiUrl + '/product/bycategory/' + categoryId, filters, { params: params })
			.pipe(
				map(result =>
				{
					if (!result || !result.data) return null;
					result.data.map(item =>
					{
						item.priceAfterDiscount = 0;
						if (item.discount > 0)
						{
							item.priceAfterDiscount = item.price * (1 - item.discount / 100);
						}
						item.rating = this.calcRating(item.ratingCount, item.ratingSum);
						item.ratingStars = this.roundRatingForStars(item.rating);
					});
					return result;
				}),
				catchError(err =>
				{
					return of(null);
				}));
	}
}
