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
	submitted: boolean = false;
	model: LoginFormModel = {
		Username: '',
		Password: '',
		IsPersistant: false,
	};
	loginSuccess: boolean = false;

	constructor(private http: HttpClient)
	{

	}

	async OnSubmit()
	{
		if (this.loginForm.invalid) return;
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': '*',
				'charset': 'utf-8'
			});

		this.http.post('https://localhost:7067/api/user/login/', this.model, {
			headers: headers
		})
			.subscribe(
				res => 
				{
					console.log((res));

					this.loginSuccess = true;
					this.submitted = true;
					//					this.model.Password = '';
				},
				error =>
				{
					console.log(error);

					this.loginSuccess = false;
					this.submitted = true;
					//					this.model.Password = '';
				}
			);

		//
	}


}
