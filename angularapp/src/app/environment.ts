export const environment = {
	apiUrl: 'https://localhost:7067/api',
	passwordRequirements: {
		useUppercaseLetter: true,
		useLowercaseLetter: true,
		useSpecialLetter: true,
		useDigits: true,
		minLength: 8,
	}
};

export type SettingMap = { [key: string]: string | number | boolean | SettingMap | []; } | string | number | boolean;
