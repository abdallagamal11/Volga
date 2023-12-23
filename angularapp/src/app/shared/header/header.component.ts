import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryModel } from 'src/app/core/models/category-model';
import { ProfileModel } from 'src/app/core/models/profile-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { CultureService } from 'src/app/core/services/culture.service';
import { languageItem } from 'src/app/core/types/language';
import { environment } from 'src/app/environment';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy
{
	isAuthenticated = false;
	authSubscription;
	parentCategoryList: CategoryModel[] | null = null;
	language = '';
	languageList: languageItem[] = environment.culture.languageList;

	get currentUser(): ProfileModel | null
	{
		return this.authService.user;
	}

	constructor(private authService: AuthService,
		private categoryService: CategoryService,
		private cultureService: CultureService)
	{
		this.authSubscription = this.authService.getAuthenticatedObservable().subscribe((value) =>
		{
			this.isAuthenticated = value;
			if (value == true)
			{
				this.authService.currentUser;
			}
		});

		this.categoryService.getParentCategories().subscribe(result =>
		{
			if (result)
			{
				this.parentCategoryList = result;
			}
		});
		this.language = this.cultureService.currentLanguage.key;
	}

	ngOnDestroy()
	{
		this.authSubscription.unsubscribe();

	}

	useLanguage(e: Event, languageKey: string): void
	{
		e.preventDefault();

		this.cultureService.useLanguage(languageKey);
		this.language = languageKey;
	}
}