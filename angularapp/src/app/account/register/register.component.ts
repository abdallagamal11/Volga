import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Gender } from 'src/app/core/enums/gender';
import { RegisterModel } from 'src/app/core/models/register-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { VgFormControls, VgFormGroup } from 'src/app/core/types/vg-form-group';
import { UserValidators } from 'src/app/core/validators/user-validators';
import { environment } from 'src/app/environment';
//import { LOCALE_ID, Inject } from '@angular/core';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
	registerForm!: VgFormGroup<RegisterModel>;
	controls!: VgFormControls<RegisterModel>;
	genders: any[] = Object.entries(Gender)
		.map(([key, value]) => ({ key: key, value: Number(value) }))
		.filter(({ key }) =>
		{
			if (isNaN(Number(key)))
				return true;
			return false;
		});
	passwordRequirementsPhrase = '';

	constructor(private authService: AuthService, private translate: TranslateService)
	{
	}
	ngOnInit(): void
	{

		this.controls = {
			username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.pattern('^(?![0-9]*$)[a-zA-Z0-9_-]+$')], asyncValidators: [UserValidators.usernameTaken(this.authService)] }),
			password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, UserValidators.passwordValidator(), Validators.minLength(environment.passwordRequirements.minLength)] }),
			confirmPassword: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			gender: new FormControl<Gender | number>(-1, { nonNullable: true, validators: [Validators.required, UserValidators.enumValidator(Gender)] }),
			birthDate: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email], asyncValidators: [UserValidators.emailTaken(this.authService)] }),
		};
		this.registerForm = new FormGroup(this.controls, [UserValidators.matchConfirmedValidator('password', 'confirmPassword')]);
		this.buildWrongPasswordPatternPhrase();
	}

	buildWrongPasswordPatternPhrase(): void
	{
		this.passwordRequirementsPhrase = '';
		const requirements: string[] = [];
		if (environment.passwordRequirements.useDigits)
		{
			requirements.push(this.translate.instant('account.password.digits'));
		}
		if (environment.passwordRequirements.useLowercaseLetter)
		{
			requirements.push(this.translate.instant('account.password.lowercase'));
		}
		if (environment.passwordRequirements.useUppercaseLetter)
		{
			requirements.push(this.translate.instant('account.password.uppercase'));
		}
		if (environment.passwordRequirements.useSpecialLetter)
		{
			requirements.push(this.translate.instant('account.password.specialletter'));
		}
		this.passwordRequirementsPhrase = requirements.join(', ');
	}

	onSubmit()
	{
		const model: RegisterModel = <RegisterModel>this.registerForm.value;

		this.authService.register(model).subscribe(
			res =>
			{
				console.log(res);
			}
		);
	}


}