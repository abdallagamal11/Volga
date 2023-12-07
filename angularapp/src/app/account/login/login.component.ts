import { Component, Injectable, OnInit } from '@angular/core';
import { LoginFormModel } from 'src/app/core/Models/login-form-model';
import { ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent
{
	@ViewChild("loginForm") loginForm: any;
	@ViewChild("Password") Password: any;
	submitted: boolean = false;
	model: LoginFormModel = {
		Username: '',
		Password: '',
		IsPersistant: false,
	};
	loginSuccess: boolean | undefined = undefined;

	constructor(private http: HttpClient)
	{

	}

	async OnSubmit()
	{
		if (this.loginForm.invalid) return;

		this.submitted = true;
		this.loginSuccess = undefined;

		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': '*',
				'charset': 'utf-8'
			});
		let baseUrl = 'https://localhost:7067/api';

		setTimeout(() =>
		{
			this.http.post(baseUrl + '/user/login/', this.model, {
				headers: headers
			})
				.subscribe(
					res => 
					{
						this.loginSuccess = true;
						this.Password.reset();
					},
					error =>
					{
						this.loginSuccess = false;
						this.Password.reset();
						this.submitted = false;
					}
				);
		}, 1000);
	}
}