import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Observable, map } from "rxjs";
import { environment } from "src/app/environment";

export class UserValidators
{
	static emailTaken(authService: AuthService): AsyncValidatorFn
	{
		return (control: AbstractControl): Observable<ValidationErrors | null> =>
		{
			const email = control.value;

			return authService.isEmailTaken(email).pipe(
				map(result =>
				{
					if (result === true)
					{
						return { emailTaken: true };
					}
					return null;
				})
			);
		}
	}

	static usernameTaken(authService: AuthService): AsyncValidatorFn
	{
		return (control: AbstractControl): Observable<ValidationErrors | null> =>
		{
			const user = control.value;

			return authService.isUsernameTaken(user).pipe(
				map(result =>
				{
					if (result === true)
					{
						return { usernameTaken: true };
					}
					return null;
				})
			);
		}
	}

	static matchConfirmedValidator(controlName: string, matchControlName: string): ValidatorFn
	{
		return (control: AbstractControl): ValidationErrors | null =>
		{
			const mainControl: AbstractControl | null = control.get(controlName);
			const matchControl: AbstractControl | null = control.get(matchControlName);
			if (mainControl && matchControl && mainControl.value !== matchControl.value)
			{
				matchControl.setErrors({ ...matchControl.errors, ... { confirmMismatch: true } });
			}
			return null;
		}
	}

	static enumValidator(enumData: object): ValidatorFn
	{
		return (ctr: AbstractControl): ValidationErrors | null =>
		{
			if (Object.values(enumData).includes(ctr.value))
			{
				return null;
			}
			return { required: true };
		}
	}

	static passwordValidator(): ValidatorFn
	{
		return (ctrl: AbstractControl): ValidationErrors | null =>
		{
			const password: string = ctrl.value;
			if (environment.passwordRequirements.useDigits && !password.match(/(?=.*[0-9])/))
			{
				return { pattern: true };
			}
			if (environment.passwordRequirements.useUppercaseLetter && !password.match(/(?=.*[A-Z])/))
			{
				return { pattern: true };
			}
			if (environment.passwordRequirements.useLowercaseLetter && !password.match(/(?=.*[a-z])/))
			{
				return { pattern: true };
			}
			if (environment.passwordRequirements.useSpecialLetter && !password.match(/(?=.*[!@#$&%*])/))
			{
				return { pattern: true };
			}

			return null;
		}
	}
}