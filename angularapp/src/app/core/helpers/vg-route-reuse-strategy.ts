import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouteReuseStrategy } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class VgRouteReuseStrategy implements RouteReuseStrategy
{
	shouldDetach(route: ActivatedRouteSnapshot): boolean
	{
		return false;
	}

	store(route: ActivatedRouteSnapshot, handle: {}): void
	{
		// You can store route information or handle here if needed
	}

	shouldAttach(route: ActivatedRouteSnapshot): boolean
	{
		return false;
	}

	retrieve(route: ActivatedRouteSnapshot): null
	{
		return null;
	}

	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean
	{
		return future.routeConfig === curr.routeConfig && future.params === curr.params; // default is true if configuration of current and future route are the same
	}
}