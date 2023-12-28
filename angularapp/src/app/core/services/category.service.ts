import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';
import { CategoryModel } from '../models/category-model';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CategoryService
{
	constructor(private http: HttpClient) { }

	getParentCategories(): Observable<CategoryModel[] | null>
	{
		return this.http.get<CategoryModel[] | null>(environment.apiUrl + '/category/parentAll');
	}

	getChildrenCategories(id: number): Observable<CategoryModel[] | null>
	{
		return this.http.get<CategoryModel[] | null>(environment.apiUrl + '/category/childrenAll', { params: { id: id } });
	}
}
