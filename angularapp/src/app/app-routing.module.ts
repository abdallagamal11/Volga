import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorNotFoundComponent } from './layout/error-not-found/error-not-found.component';
import { ForbiddenComponent } from './layout/forbidden/forbidden.component';

const routes: Routes = [
	{ path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
	{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
	{ path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
	{ path: 'forbidden', component: ForbiddenComponent },
	{ path: '**', component: ErrorNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule],
})

export class AppRoutingModule { }