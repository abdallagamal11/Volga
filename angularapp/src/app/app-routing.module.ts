import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountModule } from 'src/account/account.module';

const routes: Routes = [
	{ path: 'account', loadChildren: () => AccountModule },
	{ path: '', component: HomeComponent },
	{ path: '**', component: HomeComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})

export class AppRoutingModule { }