import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/core/models/product-model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent
{
	copyToClipboard(text: string)
	{
		navigator.clipboard.writeText(text);
	}

	@Input() productData: ProductModel | undefined = undefined;

	get shareLinks(): { [K in keyof any]: string }
	{
		const pageUrl = window.location.href;
		const tweet = encodeURIComponent(this.productData?.title ?? "");

		const fbLink = "https://www.facebook.com/sharer.php?u=" + pageUrl;
		const xLink = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + tweet;
		const linkedinLink = "https://www.linkedin.com/sharing/share-offsite/?url=" + pageUrl;
		const mailLink = 'mailto:?body=' + tweet + "+" + pageUrl;

		return { fb: fbLink, x: xLink, linkedin: linkedinLink, mail: mailLink, copy: pageUrl };
	}
}
