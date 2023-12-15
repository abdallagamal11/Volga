import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../account/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { AlreadyLoggedinComponent } from './already-loggedin/already-loggedin.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AutofillMonitorDirective } from '../core/directives/autofill-monitor.directive';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile/profile.component';
import { AuthguardService } from '../core/services/authguard.service';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'logout', component: LogoutComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'alreadyloggedin', component: AlreadyLoggedinComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthguardService] },
];

@NgModule({
	declarations: [LoginComponent, AlreadyLoggedinComponent, LogoutComponent, RegisterComponent, ProfileComponent, ResetpasswordComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule,
	],
	providers: [AuthService, AutofillMonitorDirective]
})
export class AccountModule { }
