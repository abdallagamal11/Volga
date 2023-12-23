import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenModel } from '../models/token-model';
import { BehaviorSubject, Observable, Subject, catchError, map, of, shareReplay, throwError } from 'rxjs';
import { RegisterModel } from '../models/register-model';
import { environment } from 'src/app/environment';
import { ProfileModel } from '../models/profile-model';

@Injectable({
	providedIn: 'root'
})
export class AuthService
{
	private loggedIn = false;
	private isLoggedInSubject = new BehaviorSubject<boolean>(false);
	public isLoggedIn$ = this.isLoggedInSubject.asObservable();

	public user: ProfileModel | null = null;
	private userRequestSent = false;

	constructor(private http: HttpClient) { }

	get currentUser(): ProfileModel | null
	{
		if (this.loggedIn == false || this.userRequestSent) return null;
		if (this.user != null) return this.user;

		this.userRequestSent = true;
		this.getProfile().subscribe(result =>
		{
			this.currentUser = result;
			this.userRequestSent = false;
		});
		return this.user;
	}

	set currentUser(value: ProfileModel | null)
	{
		this.user = value;
	}

	setAuthStatus(value: boolean): void
	{
		if (value == false) this.currentUser = null;
		this.loggedIn = value;
		this.isLoggedInSubject.next(value);
		this.currentUser;
	}

	getAuthenticatedObservable(): Observable<boolean>
	{
		return this.isLoggedInSubject.asObservable();
	}

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
					this.setAuthStatus(true);
					this.signIn(result.token, result.expire);
					return true;
				}
				else
				{
					this.setAuthStatus(false);
					return false;
				}
			}),
			catchError(() =>
			{
				this.setAuthStatus(false);
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

			this.setAuthStatus(true);
			return true;
		}
		catch (Error)
		{
			console.log(Error);
			return false;
		}
	}

	updateProfile(model: ProfileModel): Observable<ProfileModel | null>
	{
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'charset': 'utf-8'
		});
		return this.http.patch<ProfileModel | null>(environment.apiUrl + '/user/profile/', model, {
			headers: headers
		}).pipe(
			map(result =>
			{
				if (result) this.currentUser = result;
				return result;
			}),
			catchError((response) =>
			{
				return throwError(() => response.error)
			}),
			shareReplay(1)
		);
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

		return this.http.post<object>(baseUrl + '/user/register/', model, {
			headers: headers
		}).pipe(
			map((result) =>
			{
				if (!result) return false;
				const loginModel: LoginModel = {
					Username: model.username,
					Password: model.password,
					IsPersistant: false
				}
				this.login(loginModel);
				return true;
			}),
			catchError((errors) =>
			{
				console.log(errors);

				this.setAuthStatus(false);
				return of(false);
			})
		);
	}

	logout()
	{
		localStorage.removeItem('jwt');
		localStorage.removeItem('jwtExpiration');
		this.setAuthStatus(false);
	}

	isAuthenticated(): boolean
	{
		const token: string | null = localStorage.getItem('jwt');
		const tokenExpiration: string | null = localStorage.getItem('jwtExpiration');
		const expire: number = (tokenExpiration != null ? parseInt(tokenExpiration) : 0);

		if (token && tokenExpiration != null && expire > Math.round(Date.now() / 1000))
		{
			this.setAuthStatus(true);
			return true;
		}
		this.setAuthStatus(false);
		return false;
	}

	getProfile(): Observable<ProfileModel | null>
	{
		if (!this.isAuthenticated()) return of(null);
		return this.http.get<ProfileModel | null>(environment.apiUrl + '/user/profile/').pipe(
			map(result =>
			{
				if (result) return result;
				return null;
			}),
			catchError(err =>
			{
				return of(null);
			}),
			shareReplay(1)
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