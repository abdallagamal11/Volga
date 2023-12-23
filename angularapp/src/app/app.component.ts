import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageItem } from './core/types/language';
import { environment } from './environment';
import { CultureService } from './core/services/culture.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent
{
	title = 'angularapp';
	language: languageItem | undefined;
	constructor(private cultureService: CultureService)
	{
	}

	useLanguage(language: string): void
	{
		this.cultureService.useLanguage(language);
	}
}
