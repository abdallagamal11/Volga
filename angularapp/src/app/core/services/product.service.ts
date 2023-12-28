import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { environment } from 'src/app/environment';

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
				console.log(result);

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
		const decimalPart: number = rating - integerPart;

		if ([0.1, 0.2].includes(decimalPart)) return integerPart;
		if ([0.8, 0.9].includes(decimalPart)) return Math.ceil(rating);
		return rating;
	}

	getPagedProductsByCategory()
	{

	}
}
