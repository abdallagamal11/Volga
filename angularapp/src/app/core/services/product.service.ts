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
	constructor(private http: HttpClient)
	{

	}

	getFeaturedProducts(): Observable<ProductModel[] | null>
	{
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'charset': 'utf-8'
		});
		return this.http.get<ProductModel[] | null>(environment.apiUrl + '/product/recommended', { headers: headers }).pipe(
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
					});
				return result;
			}),
			catchError(error => throwError(() => error))
		);
	}
}
