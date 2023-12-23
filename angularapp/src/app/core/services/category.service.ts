import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';
import { CategoryModel } from '../models/category-model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CategoryService
{

	constructor(private http: HttpClient) { }

	getParentCategories(): Observable<CategoryModel[] | null>
	{
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'charset': 'utf-8'
		});
		return this.http.get<CategoryModel[] | null>(environment.apiUrl + '/category/parentAll', { headers: headers });
	}
}
