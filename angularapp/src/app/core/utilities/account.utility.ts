import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/app/environment";

export function buildWrongPasswordPatternPhrase(translate: TranslateService): string
{
	let passwordRequirementsPhrase = '';
	const requirements: string[] = [];
	if (environment.passwordRequirements.useDigits)
	{
		requirements.push(translate.instant('account.password.digits'));
	}
	if (environment.passwordRequirements.useLowercaseLetter)
	{
		requirements.push(translate.instant('account.password.lowercase'));
	}
	if (environment.passwordRequirements.useUppercaseLetter)
	{
		requirements.push(translate.instant('account.password.uppercase'));
	}
	if (environment.passwordRequirements.useSpecialLetter)
	{
		requirements.push(translate.instant('account.password.specialletter'));
	}
	passwordRequirementsPhrase = requirements.join(', ');
	return passwordRequirementsPhrase;
}

