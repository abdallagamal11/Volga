import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/core/enums/gender';
import { ProfileModel } from 'src/app/core/models/profile-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { VgFormControls, VgFormGroup } from 'src/app/core/types/vg-form-group';
import { DateUtility } from 'src/app/core/utilities/date.utility';
import { UserValidators } from 'src/app/core/validators/user-validators';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
	profileForm!: VgFormGroup<ProfileModel>;
	controls!: VgFormControls<ProfileModel>;
	genders: { key: string, value: number }[] = Object.entries(Gender)
		.map(([key, value]) => ({ key: key, value: Number(value) }))
		.filter(({ key }) =>
		{
			if (isNaN(Number(key)))
				return true;
			return false;
		});
	passwordRequirementsPhrase = '';
	profileModel: ProfileModel | undefined;

	constructor(private authService: AuthService) { }

	ngOnInit(): void
	{
		this.controls = {
			username: new FormControl<string>({ disabled: true, value: '' }, { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.pattern('^(?![0-9]*$)[a-zA-Z0-9_-]+$')] }),
			password: new FormControl<string | null>('', { validators: Validators.required }),
			firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			gender: new FormControl<Gender | number>(-1, { nonNullable: true, validators: [Validators.required, UserValidators.enumValidator(Gender)] }),
			birthDate: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
			email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
			phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [] }),//Validators.required
			address: new FormControl<string>('', { nonNullable: true, validators: [] }),
		};
		//
		this.profileForm = new FormGroup(this.controls);

		// Fetching Profile Data
		this.authService.getProfile().subscribe(result =>
		{
			if (!result)
			{
				this.profileModel = undefined;
				return false;
			}
			else
			{
				this.profileModel = result;
				this.controls.username.setValue(result.username);
				this.controls.firstName.setValue(result.firstName);
				this.controls.lastName.setValue(result.lastName);
				this.controls.gender.setValue(result.gender);
				this.controls.birthDate.setValue(DateUtility.formatDateHtml(result.birthDate));//result.birthDate.substring(0, result.birthDate.indexOf('T'))
				this.controls.phoneNumber.setValue(result.phoneNumber);
				this.controls.address.setValue(result.address);
				this.controls.email.setValue(result.email);
				this.controls.email.setAsyncValidators(UserValidators.emailTaken(this.authService, result.email));
				return true;
			}
		});
	}

	onSubmit()
	{
		const profileModel: ProfileModel = <ProfileModel>this.profileForm.value;
		this.authService.updateProfile(profileModel).subscribe(
			(result) =>
			{
				console.log(result);

				this.controls.password.markAsUntouched();
				this.controls.password.setValue('');
			},
			(errors: { [K in keyof string]: string } | undefined) =>
			{
				if (errors != undefined)
				{
					const ctrlArr: string[] = Object.keys(this.controls);
					Object.entries(errors)
						.map(([key, value]) => ({ key: key, value: value }))
						.forEach(
							(obj: { key: string, value: string }) =>
							{
								const normalizedCtrlArr = ctrlArr.map(c => c.toLowerCase());
								const ctrlIndex = normalizedCtrlArr.indexOf(obj.key.toLowerCase());
								if (ctrlIndex != -1)
								{
									const errKey: string = (typeof obj.value == 'string' ? obj.value : obj.value[0]);

									const ctrl = this.profileForm.get(ctrlArr[ctrlIndex]);
									ctrl?.setErrors({ [errKey]: true });
								}
							});
				}
			});
	}
}
