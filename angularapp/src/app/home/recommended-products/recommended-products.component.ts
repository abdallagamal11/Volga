import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductModel } from 'src/app/core/models/product-model';
import { CultureService } from 'src/app/core/services/culture.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
	selector: 'app-recommended-products',
	templateUrl: './recommended-products.component.html',
	styleUrls: ['./recommended-products.component.css'],
})
export class RecommendedProductsComponent implements OnDestroy
{
	currentLang = this.cultureService.currentLanguage;
	@ViewChildren('carouselItems') carouselItems: ElementRef[] = [];
	responsiveOptions: {} = {
		0: {
			numVisible: 1,
			numScroll: 1
		},
		500: {
			numVisible: 2,
			numScroll: 2
		},
		600: {
			numVisible: 3,
			numScroll: 3
		},
		800: {
			numVisible: 4,
			numScroll: 4
		},
	};
	private subscription!: Subscription;

	public featuredProducts: ProductModel[] | undefined | null;

	constructor(private productService: ProductService, private cultureService: CultureService, private cdr: ChangeDetectorRef)
	{
		this.setFeaturedProducts();
	}

	setFeaturedProducts()
	{
		this.subscription = this.productService.getFeaturedProducts().subscribe(result =>
		{
			this.featuredProducts = (result ? result : null);
		});
	}

	ngOnDestroy()
	{
		this.subscription.unsubscribe();
	}
}