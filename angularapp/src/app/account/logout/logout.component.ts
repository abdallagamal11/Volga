import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouteParamsService } from 'src/app/core/services/route-params.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent
{
	constructor(authService: AuthService, private routeService: RouteParamsService, router: Router)
	{
		authService.logout();
		const returnUrl: string | null | undefined = routeService.getParams()?.get('returnUrl');
		if (returnUrl)
		{
			router.navigateByUrl(returnUrl);
		}
	}
}