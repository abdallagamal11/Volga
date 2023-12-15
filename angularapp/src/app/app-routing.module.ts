import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/account.module';
import { ErrorNotFoundComponent } from './shared/error-not-found/error-not-found.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';

const routes: Routes = [
	{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
	{ path: 'forbidden', component: ForbiddenComponent },
	{ path: '', component: HomeComponent },
	{ path: '404', component: ErrorNotFoundComponent },
	{ path: '**', component: ErrorNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})

export class AppRoutingModule { }