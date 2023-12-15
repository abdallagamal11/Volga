/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from '@angular/core';
import { LoginModel } from '../../core/models/login-model';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent
{
	@ViewChild("loginForm") loginForm!: FormGroup;
	@ViewChild("Password") Password!: FormControl;
	submitted = false;
	model: LoginModel = {
		Username: '',
		Password: '',
		IsPersistant: false,
	};
	loginSuccess: boolean | undefined = undefined;

	constructor(private authService: AuthService, router: Router)
	{
		if (authService.isAuthenticated())
			router.navigate(['/account', 'alreadyloggedin']);
	}

	async OnSubmit()
	{
		if (this.loginForm.invalid) return;

		this.submitted = true;
		this.loginSuccess = undefined;
		this.authService.login(this.model).subscribe((result) =>
		{
			if (result)
			{
				this.loginSuccess = true;
				this.Password.reset();
			}
			else
			{
				this.loginSuccess = false;
				this.Password.reset();
				this.submitted = false;
			}
		});
	}
}