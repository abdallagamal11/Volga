import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/core/models/product-model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent
{
	id: number | undefined;
	data: ProductModel | null = null;
	public showReviews = false;

	private reviewsbtn: ElementRef | undefined;
	@ViewChild('reviewsbtn') set reviewsbtnElm(content: ElementRef)
	{
		if (content)
		{
			this.reviewsbtn = content;
			this.reviewsbtn.nativeElement.addEventListener('shown.bs.tab', () =>
			{
				this.showReviews = true;
			});
		}

	}

	constructor(private activatedRoute: ActivatedRoute, private productService: ProductService)
	{
		this.activatedRoute.params.subscribe(list => 
		{
			if (list['id'])
			{
				this.id = list['id'];
				this.productService.getProductById(this.id).subscribe(result =>
				{
					this.data = result;
				});
			}
		});
	}
}
