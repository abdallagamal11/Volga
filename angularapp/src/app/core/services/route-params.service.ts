import { Injectable } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class RouteParamsService
{
	returnUrl: string | null = "";
	finalPrevUrl: string | undefined = "";
	params: ParamMap | undefined;

	constructor(private route: ActivatedRoute, private router: Router)
	{
		route.queryParamMap.subscribe((params: ParamMap) =>
		{
			this.returnUrl = params.get('returnUrl');
			this.params = params;
		});
		this.finalPrevUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
	}

	getParams(): ParamMap | undefined
	{
		return this.params;
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