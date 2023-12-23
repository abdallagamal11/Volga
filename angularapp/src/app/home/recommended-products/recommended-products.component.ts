import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';

import { ProductModel } from 'src/app/core/models/product-model';
import { CultureService } from 'src/app/core/services/culture.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/app/environment';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { register } from 'swiper/element/bundle';

@Component({
	selector: 'app-recommended-products',
	templateUrl: './recommended-products.component.html',
	styleUrls: ['./recommended-products.component.css'],
})
export class RecommendedProductsComponent implements OnInit
{
	currentLang = this.cultureService.currentLanguage;
	@ViewChildren('carouselItems') carouselItems: ElementRef[] | undefined;

	ngOnInit()
	{
		this.cdr.detectChanges();
	}

	public featuredProducts: ProductModel[] | null = null;

	constructor(private productService: ProductService, private cultureService: CultureService, private cdr: ChangeDetectorRef)
	{
		this.setFeaturedProducts();
	}

	setFeaturedProducts()
	{
		this.productService.getFeaturedProducts().subscribe(result =>
		{
			this.featuredProducts = result;
		});
	}
}