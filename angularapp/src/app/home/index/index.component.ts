import { Component } from '@angular/core';
import { ProductModel } from 'src/app/core/models/product-model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent
{
	//public featuredProducts: ProductModel[] | undefined | null;
	numbers: number[] = Array(9).fill(5);

}