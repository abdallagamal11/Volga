import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouteParamsService } from 'src/app/core/services/route-params.service';

@Component({
	selector: 'app-already-loggedin',
	templateUrl: './already-loggedin.component.html',
	styleUrls: ['./already-loggedin.component.css']
})
export class AlreadyLoggedinComponent
{
	constructor(private router: Router, private routeService: RouteParamsService)
	{

	}

	goBack(): void
	{
		this.routeService.goBack();
	}

	logout(): void
	{
		this.router.navigate(['/account', 'logout'], { queryParams: { 'returnUrl': '/account/login' } });
	}
}
