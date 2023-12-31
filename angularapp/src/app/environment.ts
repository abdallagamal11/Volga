import { languageItem } from './core/types/language'

export const environment = {
	apiUrl: 'https://localhost:7067/api',
	passwordRequirements: {
		useUppercaseLetter: true,
		useLowercaseLetter: true,
		useSpecialLetter: true,
		useDigits: true,
		minLength: 8,
	},
	culture: {
		languageList: [
			{ key: 'en', value: 'English', rtl: false },
			{ key: 'ar', value: 'Arabic', rtl: true }
		],
		currentLanguage: { key: 'en', value: 'English', rtl: false },
	},
	productList: {
		productsPerPage: 10,
		pagination:
		{
			pageSize: 4
		}
	}
};

export type SettingMap = { [key: string]: string | number | boolean | SettingMap | []; } | string | number | boolean;
