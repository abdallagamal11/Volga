import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
	selector: 'app-error-not-found',
	templateUrl: './error-not-found.component.html',
	styleUrls: ['./error-not-found.component.css']
})
export class ErrorNotFoundComponent
{
	returnUrl: string | null = null;
	finalPrevUrl: string | undefined;
	constructor(private route: ActivatedRoute, private router: Router)
	{
		this.route.queryParamMap.subscribe((params: ParamMap) => 
		{
			this.returnUrl = params.get('returnUrl');
		});
		this.finalPrevUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
	}

	goBack(): void
	{
		if (this.returnUrl)
			this.router.navigateByUrl(this.returnUrl);
		else if (this.finalPrevUrl)
			this.router.navigateByUrl(this.finalPrevUrl);
		else
			history.back();
	}
}
