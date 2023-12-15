import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenModel } from '../models/token-model';
import { Observable, catchError, map, of } from 'rxjs';
import { query } from '@angular/animations';
import { RegisterModel } from '../models/register-model';
import { environment } from 'src/app/environment';
import { ProfileModel } from '../models/profile-model';

@Injectable({
	providedIn: 'root'
})
export class AuthService
{
	private loggedIn = false;
	constructor(private http: HttpClient) { }

	login(loginModel: LoginModel): Observable<boolean>
	{
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'charset': 'utf-8'
		});
		const baseUrl = environment.apiUrl;

		return this.http.post<TokenModel>(baseUrl + '/user/login/', loginModel, {
			headers: headers
		}).pipe(
			map((result) =>
			{
				if (result.token != null)
				{
					this.loggedIn = true;
					this.signIn(result.token, result.expire);
					return true;
				}
				else
				{
					this.loggedIn = false;
					return false
				}
			}),
			catchError(() =>
			{
				this.loggedIn = false;
				return of(false);
			})
		);
	}

	signIn(token: string, jwtExpiration: number): boolean
	{
		try
		{
			localStorage.setItem('jwt', token);
			localStorage.setItem('jwtExpiration', jwtExpiration.toString());
			return true;
		}
		catch (Error)
		{
			console.log(Error);
			return false;
		}
	}

	register(model: RegisterModel): Observable<boolean>
	{
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'charset': 'utf-8'
		});
		const baseUrl = environment.apiUrl;
		console.log('hey i"m called');
		return this.http.post<object>(baseUrl + '/user/register/', model, {
			headers: headers
		}).pipe(
			map((result) =>
			{
				console.log(result);
				return true;
				// if (result.token != null)
				// {
				// 	this.loggedIn = true;
				// 	this.signIn(result.token, result.expire);
				// 	return true;
				// }
				// else
				// {
				// 	this.loggedIn = false;
				// 	return false
				// }
			}),
			catchError((errors) =>
			{
				console.log(errors);

				this.loggedIn = false;
				return of(false);
			})
		);
	}

	logout()
	{
		localStorage.removeItem('jwt');
		localStorage.removeItem('jwtExpiration');
	}

	isAuthenticated(): boolean
	{
		const token: string | null = localStorage.getItem('jwt');
		const tokenExpiration: string | null = localStorage.getItem('jwtExpiration');
		const expire: number = (tokenExpiration != null ? parseInt(tokenExpiration) : 0);

		if (token && tokenExpiration != null && expire > Math.round(Date.now() / 1000))
		{
			return true;
		}
		return false;
	}

	getProfile(): Observable<ProfileModel | null>
	{
		if (!this.isAuthenticated()) return of(null);
		return this.http.get<ProfileModel | null>(environment.apiUrl + '/user/profile/').pipe(
			map(result =>
			{
				console.log(result);

				if (result) return result;
				return null;
			}),
			catchError(err =>
			{
				return of(null);
			})
		);
	}

	getToken(): string | null
	{
		if (!this.isAuthenticated()) return null;
		return localStorage.getItem('jwt');
	}

	isEmailTaken(email: string): Observable<boolean>
	{
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'charset': 'utf-8'
		});
		const baseUrl = environment.apiUrl;
		const params = { email: email };

		return this.http.post<boolean>(baseUrl + '/user/validation/checkemail/', null, { headers: headers, params: params })
			.pipe(
				map(() =>
				{
					return false;
				}),
				catchError(() =>
				{
					return of(true);
				})
			);
	}

	isUsernameTaken(username: string): Observable<boolean>
	{
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': '*',
				'charset': 'utf-8'
			});
		const baseUrl = 'https://localhost:7067/api';
		const params = { username: username };

		return this.http.post<boolean>(baseUrl + '/user/validation/checkusername/', null, { headers: headers, params: params })
			.pipe(
				map(() =>
				{
					return false;
				}),
				catchError(() =>
				{
					return of(true);
				})
			);
	}
}