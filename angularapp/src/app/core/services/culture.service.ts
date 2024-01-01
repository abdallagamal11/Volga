import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageItem } from '../types/language';
import { environment } from 'src/app/environment';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class CultureService
{
	public currentLanguage: languageItem;
	constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document)
	{
		this.currentLanguage = environment.culture.currentLanguage;
		translate.setDefaultLang(this.currentLanguage.key);
		this.useLanguage(this.currentLanguage.key);
	}

	useLanguage(languageKey: string): void
	{
		this.translate.use(languageKey);
		const newLang: languageItem | undefined =
			environment.culture.languageList.find(item => item.key === languageKey);
		if (newLang != undefined)
		{
			environment.culture.currentLanguage = newLang;
			this.currentLanguage = environment.culture.currentLanguage;
			if (newLang.rtl)
			{
				const rtlCss = document.createElement('link');
				rtlCss.rel = 'stylesheet';
				rtlCss.href = './assets/css/rtl.css';
				rtlCss.id = 'rtlCss';

				this.document.querySelector('html')?.setAttribute('dir', 'rtl');
				this.document.querySelector('head')?.appendChild(rtlCss);
			}
			else
			{
				this.document.querySelector('#rtlCss')?.remove();
				this.document.querySelector('html')?.setAttribute('dir', 'ltr');
			}
			this.document.querySelector('html')?.setAttribute('lang', newLang.key)
		}
	}
}